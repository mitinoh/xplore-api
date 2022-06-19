import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateRateLocationDto } from './dto/create-rate-location.dto';
import { UpdateRateLocationDto } from './dto/update-rate-location.dto';
import { RateLocation, RateLocationDocument } from './entities/rate-location.entity';
import { Model } from "mongoose";
import mongoose from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { Http2ServerRequest } from 'http2';
import { MongoQueryModel } from 'nest-mongo-query-parser';
import { UserService } from '../user/user.service';
import { MongooseQueryParser } from 'mongoose-query-parser';

@Injectable()
export class RateLocationService {

  constructor(
    @InjectModel(RateLocation.name) private rateLocationModel: Model<RateLocationDocument>, 
    @Inject('winston')  private readonly logger: Logger,
    private authService: AuthService, 
    private readonly userService: UserService) { }
    mongooseParser = new MongooseQueryParser()

  async create(req: Http2ServerRequest, createRateLocationDto: CreateRateLocationDto) {
    try {
      let uid: any =await this.userService.getUserObjectId(req) ?? '';
      let newCreateNewLocation = new this.rateLocationModel({...createRateLocationDto, uid: uid}); 
      return await newCreateNewLocation.save();
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED);
    }
  }

  async findAll(req: Http2ServerRequest, query: any) {
    try {
      let mQuery = this.mongooseParser.parse(query)
      let uid: any = await this.userService.getUserObjectId(req) ?? '';
      return await this.rateLocationModel
        .find({uid: uid})
        .populate('uid')
        .populate('location')
        .limit(mQuery.limit)
        .skip(mQuery.skip)
        .sort(mQuery.sort)
        .select(mQuery.select)
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED);
    }
  }

  async findOne(id: string) {
    try {  
      return await this.rateLocationModel.findOne({ _id: id });
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED);
    }
  }

  async update(id: string, updateRateLocationDto: UpdateRateLocationDto) {
    try {
      return await this.rateLocationModel.findOneAndUpdate(
        { _id: id },
        updateRateLocationDto, 
        {new: false}
      )
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED);
    }
  }

  async remove(id: string) {
    try {
      let objId = new mongoose.Types.ObjectId(id)
      let ret = await this.rateLocationModel.deleteOne({ _id: objId })
      return ret.deletedCount > 0
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED);
    }
  }
}
