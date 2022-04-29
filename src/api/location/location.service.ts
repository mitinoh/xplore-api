import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { LocationDocument , Location} from './entities/location.entity';
import { Model } from "mongoose";
import { MongoQueryModel } from 'nest-mongo-query-parser';
import * as mongoose from 'mongoose'
import { Http2ServerRequest } from 'http2';

@Injectable()
export class LocationService {

  
  constructor(
    @InjectModel(Location.name) private locationModel: Model<LocationDocument>,
    @Inject('winston') private readonly logger: Logger) { }


  async create(req: Http2ServerRequest, createLocationDto: CreateLocationDto) {
    try {
      console.log(createLocationDto)
      let newCreateLocation = new this.locationModel({...createLocationDto});
      console.log(newCreateLocation)
      
      return await newCreateLocation.save();
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED);
    }
  }

  async findAll(query: MongoQueryModel) {
    try {
      return await this.locationModel
        .find(query.filter)
        .populate('locationcategory')
        .limit(query.limit)
        .skip(query.skip)
        .sort(query.sort)
        .select(query.select)
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED);
    }
  }

  async findOne(id: string) {
    try {
      return await this.locationModel
      .findOne({ _id: id })
      .populate('locationcategory')
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED);
    }
  }

  async update(id: string, updateLocationDto: UpdateLocationDto) {
    try {
      return await this.locationModel
      .findOneAndUpdate(
        { _id: id },
        updateLocationDto, 
        { new: false })
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED);
    }
  }

  async remove(id: string) {
    try {
      let objId = new mongoose.Types.ObjectId(id)
      let ret = await this.locationModel.deleteOne({ _id: objId })
      return ret.deletedCount > 0
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED);
    }
  }
}
