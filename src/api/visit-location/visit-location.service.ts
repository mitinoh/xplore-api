import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { CreateVisitLocationDto } from './dto/create-visit-location.dto';
import { UpdateVisitLocationDto } from './dto/update-visit-location.dto';
import { Model } from "mongoose";
import mongoose from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { Http2ServerRequest } from 'http2';
import { MongoQueryModel } from 'nest-mongo-query-parser';
import { UserService } from '../user/user.service';
import { InjectModel } from '@nestjs/mongoose';
import { VisitLocation, VisitLocationDocument } from './entities/visit-location.entity';

@Injectable()
export class VisitLocationService {

  constructor(
    @InjectModel(VisitLocation.name) private visitLocationModel: Model<VisitLocationDocument>, 
    @Inject('winston') private readonly logger: Logger,
    private authService: AuthService, 
    private readonly userService: UserService) { }
  
  async create(req: Http2ServerRequest, createVisitLocationDto: CreateVisitLocationDto) {
    try {
      let uid: any =await this.userService.getUserObjectId(req) ?? '';
      let newCreateNewLocation = new this.visitLocationModel({...createVisitLocationDto, uid: uid}); 
      return await newCreateNewLocation.save();
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(error.message,HttpStatus.EXPECTATION_FAILED);
    }
  }

  async findAll(query: MongoQueryModel) {
    try {
      return await this.visitLocationModel
        .find(query.filter)
        .populate('uid')
        .populate('location')
        .limit(query.limit)
        .skip(query.skip)
        .sort(query.sort)
        .select(query.select)
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(error.message,HttpStatus.EXPECTATION_FAILED);
    }
  }

  async findOne(id: string) {
    try {
      return await this.visitLocationModel.findOne({ _id: id });
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(error.message,HttpStatus.EXPECTATION_FAILED);
    }
  }

  async update(id: string, updateVisitLocationDto: UpdateVisitLocationDto) {
    try {
      return await this.visitLocationModel.findOneAndUpdate(
        { _id: id },
        updateVisitLocationDto, 
        { new: false }
      )
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(error.message,HttpStatus.EXPECTATION_FAILED);
    }
  }

  async remove(id: string) {
    try {
      let objId = new mongoose.Types.ObjectId(id)
      let ret = await this.visitLocationModel.deleteOne({ _id: objId })
      return ret.deletedCount > 0
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(error.message,HttpStatus.EXPECTATION_FAILED);
    }
  }
}
