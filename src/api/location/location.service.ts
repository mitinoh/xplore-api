import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Http2ServerRequest } from 'http2';
import mongoose from 'mongoose';

import { Model } from "mongoose";
import { MongoQueryModel } from 'nest-mongo-query-parser';
import { AuthService } from 'src/auth/auth.service';
import shuffleArray from 'src/shared/utils';
import { SaveLocation, SaveLocationDocument } from '../save-location/entities/save-location.entity';
import { UserService } from '../user/user.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Location, LocationDocument } from './entities/location.entity';

import { ObjectId } from 'bson';
@Injectable()
export class LocationService {


  constructor(
    @InjectModel(Location.name) private locationModel: Model<LocationDocument>,
    @InjectModel(SaveLocation.name) private saveLocationModel: Model<SaveLocationDocument>,
    @Inject('winston') private readonly logger: Logger,
    private authService: AuthService,
    private readonly userService: UserService,) { }


  async create(req: Http2ServerRequest, createLocationDto: CreateLocationDto) {
    try {

      // REVIEW: ricordarsi di inserire nel db user xplore con questo objId
      let uid: any = await this.userService.getUserObjectId(req) ?? new ObjectId('628fd24dbbe643a8f1816138');
      let newCreateLocation = new this.locationModel({ ...createLocationDto, insertUid: uid });
      return await newCreateLocation.save();
    } catch (error) {
      this.logger.error(error.message)
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED);
    }
  }

  async findAll(req: Http2ServerRequest, query: MongoQueryModel) {
    try {

      return await this.locationModel

        .find(query.filter)
        .populate('locationCategory')
        .populate('insertUid')
        .limit(query.limit)
        .skip(query.skip)
        .sort(query.sort)
        .select(query.select).then(async (locations: any[]) => {
          let uid: any = await this.userService.getUserObjectId(req) ?? '';
          // FIXME: verificare se req contiene token con uid
          if (uid != '') {
            let lData: Location[] = [];
            for (const loc of locations) {
              let savedLocation: SaveLocation = await this.saveLocationModel.findOne({ location: loc._id.toString(), uid: uid });
              loc.saved = (savedLocation != null)
              lData.push(loc)
            }
            return shuffleArray(lData)
          } else {
            return shuffleArray(locations)
          }
        })

    } catch (error) {
      this.logger.error(error.message)
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED);
    }
  }

  async findOne(id: string) {
    try {
      return await this.locationModel
        .findOne({ _id: id })
        .populate('locationCategory')
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
