import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateLocationCategoryDto } from './dto/create-location-category.dto';
import { UpdateLocationCategoryDto } from './dto/update-location-category.dto';
import { LocationCategory, LocationCategoryDocument } from './entities/location-category.entity';
import { Model } from "mongoose";
import { MongoQueryModel } from 'nest-mongo-query-parser';
import * as mongoose from 'mongoose'
import { Http2ServerRequest } from 'http2';
import { MongooseQueryParser } from 'mongoose-query-parser';

@Injectable()
export class LocationCategoryService {

  constructor(
    @InjectModel(LocationCategory.name) private locationCategoryModel: Model<LocationCategoryDocument>,
    @Inject('winston')  private readonly logger: Logger) { }
  mongooseParser = new MongooseQueryParser()

  
  async create(req: Http2ServerRequest, createLocationCategoryDto: CreateLocationCategoryDto) {
    try {
      let newCreateLocationCategory = new this.locationCategoryModel(createLocationCategoryDto);
      return await newCreateLocationCategory.save();
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED);
    }
  }

  async findAll(query: any) {
    try {

      let mQuery = this.mongooseParser.parse(query);
      return await this.locationCategoryModel
      .find(mQuery.filter)
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
      return await this.locationCategoryModel.findOne({ _id: id });
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED);
    }
  }

  async update(id: string, updateLocationCategoryDto: UpdateLocationCategoryDto) {
    try {
      return await this.locationCategoryModel
        .findOneAndUpdate({ _id: id },
        updateLocationCategoryDto, { new: false })    
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED);
    }
  }

  async remove(id: string) {
    try {
      let objId = new mongoose.Types.ObjectId(id)
      let ret = await this.locationCategoryModel.deleteOne({ _id: objId })
      return ret.deletedCount > 0
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED);
    }
  }
}
