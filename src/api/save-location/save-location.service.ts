import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Http2ServerRequest } from 'http2';
import mongoose, { Model } from 'mongoose';
import { MongooseQueryParser } from 'mongoose-query-parser';
import { MongoQueryModel, MongoQueryParser } from 'nest-mongo-query-parser';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from '../user/user.service';
import { CreateSaveLocationDto } from './dto/create-save-location.dto';
import { UpdateSaveLocationDto } from './dto/update-save-location.dto';
import { SaveLocation, SaveLocationDocument } from './entities/save-location.entity';

import { ObjectId } from 'bson';
@Injectable()
export class SaveLocationService {

  constructor(
    @InjectModel(SaveLocation.name) private saveLocationModel: Model<SaveLocationDocument>,
    @Inject('winston') private readonly logger: Logger,
    private authService: AuthService,
    private readonly userService: UserService) { }
    mongooseParser = new MongooseQueryParser()

  async create(req: Http2ServerRequest, locationId: string) {
    try {
      let uid: any = await this.userService.getUserObjectId(req);
      let createSaveLocationDto: CreateSaveLocationDto = {
        location: new ObjectId(locationId),
        cdate: new Date()
      }
      let newCreateSaveLocation = new this.saveLocationModel({ ...createSaveLocationDto, uid: uid });
      return await newCreateSaveLocation.save();
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED);
    }
  }

  async findAll(req: Http2ServerRequest, query: MongoQueryModel) {
    try {

      let mQuery = this.mongooseParser.parse(query)
      let uidd: string = mQuery.filter.uid;
      delete mQuery.filter.uid
      let uid: any = await this.userService.getUserObjectId(req, uidd);

      mQuery.filter.uid = uid;
      return await this.saveLocationModel
        .find(mQuery.filter)
        .populate('uid')
        .populate({
          path: 'location',
          populate: [{
            path: 'locationCategory',
            model: 'LocationCategory'
          }, {
          path: "savedList",
          match: { uid: uid },
          }]
        })
        .populate({
          path: 'location',
          populate: {
            path: 'insertUid',
            model: 'User'
          }
        })
        .limit(mQuery.limit)
        .skip(mQuery.skip)
        .sort(mQuery.sort)
        .select(mQuery.select)
        .then(async (locations: any[]) => {
          locations.forEach((loc: any, i: number) => {
            if (loc["location"] == null)
              locations.splice(i, 1);
          })
          return locations
        })
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED);
    }
  }

  async findOne(req: Http2ServerRequest, locationId: string) {
    try {
      let uid: any = await this.userService.getUserObjectId(req); 
      return await this.saveLocationModel.findOne({ location: new ObjectId(locationId), uid: uid });
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED);
    }
  }

  async toggleLike(req: Http2ServerRequest, id: string) {
    try {
      let locationToUpdate: SaveLocationDocument = await this.findOne(req, id)
      console.log(locationToUpdate) 
      if (locationToUpdate == null)
        return this.create(req, id);
      else 
        return this.delete(req, id)
 
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED);
    }
  }

  async delete(req: Http2ServerRequest, id: string) {
    try {

      let objId = new mongoose.Types.ObjectId(id)
      let uid: any = await this.userService.getUserObjectId(req) ;
      let ret = await this.saveLocationModel.deleteOne({ locationId: objId, uid: uid._id.toString() })
      return ret.deletedCount > 0
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED);
    }
  }
}
