import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { Http2ServerRequest } from 'http2';
import { UserService } from '../user/user.service';
import { CreateUserReportDto } from './dto/create-user-report.dto';
import { UpdateUserReportDto } from './dto/update-user-report.dto';
import { UserReport, UserReportDocument } from './entities/user-report.entity';
import { Model } from "mongoose";
import { InjectModel } from '@nestjs/mongoose/dist/common/mongoose.decorators';
import { MongooseQueryParser } from 'mongoose-query-parser';

import mongoose, { mquery, PipelineStage } from 'mongoose';

@Injectable()
export class UserReportService {

  constructor(
    @InjectModel(UserReport.name) private userReportModel: Model<UserReportDocument>,
    @Inject('winston') private readonly logger: Logger,
    private readonly userService: UserService) { }

    mongooseParser = new MongooseQueryParser()
    
  async create(req: Http2ServerRequest, createUserReportDto: CreateUserReportDto) {
    try {
      // REVIEW: ricordarsi di inserire nel db user xplore con questo objId
      let reporter: any = await this.userService.getUserObjectId(req);

      let newUserReport = new this.userReportModel({ ...createUserReportDto, reporter: reporter});
      return await newUserReport.save();
    } catch (error) {
      this.logger.error(error.message)
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED);
    }
  }

  async findAll(req: Http2ServerRequest, query: any, reported: boolean, uidd: string)  {
    try {
      
    let mQuery = this.mongooseParser.parse(query);
    let uid: any = await this.userService.getUserObjectId(req, uidd);
    if (reported) 
      mQuery.filter.reported = uid
    else 
      mQuery.filter.reporter = uid

      return this.userReportModel
        .find(mQuery.filter)
        .populate('reporter')
        .populate('reported')
        .limit(query.limit)
        .skip(query.skip)
        .sort(query.sort)
      } catch (error) {
        this.logger.error(error.stack)
        throw new HttpException(error.stack, HttpStatus.EXPECTATION_FAILED);
      }
  }

  async remove(id: string) {
    try {
      let objId = new mongoose.Types.ObjectId(id)
      let ret = await this.userReportModel.deleteOne({ _id: objId })
      return ret.deletedCount > 0
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED);
    }
  }
}
