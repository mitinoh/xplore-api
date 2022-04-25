import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { Http2ServerRequest } from 'http2';
import { MongoQueryModel } from 'nest-mongo-query-parser';
import { CreateSaveLocationDto } from './dto/create-save-location.dto';
import { UpdateSaveLocationDto } from './dto/update-save-location.dto';
import { Model } from "mongoose";
import { SaveLocation, SaveLocationDocument } from './entities/save-location.entity';
import { InjectModel } from '@nestjs/mongoose';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from '../user/user.service';
import mongoose from 'mongoose';

@Injectable()
export class SaveLocationService {

  constructor(
    @InjectModel(SaveLocation.name) private saveLocationModel: Model<SaveLocationDocument>, 
    @Inject('winston') private readonly logger: Logger,
    private authService: AuthService,
    private readonly userService: UserService) { }

  async create(req: Http2ServerRequest, createSaveLocationDto: CreateSaveLocationDto) {
    try {
      let uid: any =await this.userService.getUserObjectId(req) ?? '';
      let newCreateSaveLocation = new this.saveLocationModel({...createSaveLocationDto, uid: uid}); 
      return await newCreateSaveLocation.save();
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(error.message,HttpStatus.EXPECTATION_FAILED);
    }
  }

  async findAll(query: MongoQueryModel) {
    try {
      return await this.saveLocationModel
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
      return await this.saveLocationModel.findOne({ _id: id });
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(error.message,HttpStatus.EXPECTATION_FAILED);
    }
  }

  async update(id: string, updateSaveLocationDto: UpdateSaveLocationDto) {
    try {
      return await this.saveLocationModel.findOneAndUpdate(
        { _id: id },
        updateSaveLocationDto, 
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
      let ret = await this.saveLocationModel.deleteOne({ _id: objId })
      return ret.deletedCount > 0
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(error.message,HttpStatus.EXPECTATION_FAILED);
    }
  }
}
