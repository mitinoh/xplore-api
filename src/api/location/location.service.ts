import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Http2ServerRequest } from 'http2';
import mongoose, { mquery, PipelineStage } from 'mongoose';

import { Model } from "mongoose";
import { MongoQueryModel } from 'nest-mongo-query-parser';
import { AuthService } from 'src/auth/auth.service';
import { SaveLocation, SaveLocationDocument } from '../save-location/entities/save-location.entity';
import { UserService } from '../user/user.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Location, LocationDocument } from './entities/location.entity';

import { ObjectId } from 'bson';

import { MongooseQueryParser } from 'mongoose-query-parser';
import { CoordinateFilter } from './entities/coordinate.interface';

@Injectable()
export class LocationService {


  constructor(
    @InjectModel(Location.name) private locationModel: Model<LocationDocument>,
    @InjectModel(SaveLocation.name) private saveLocationModel: Model<SaveLocationDocument>,
    @Inject('winston') private readonly logger: Logger,
    private authService: AuthService,
    private readonly userService: UserService) { }

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

  mongooseParser = new MongooseQueryParser()
  async findAll(req: Http2ServerRequest, query: any) {
    try {

    let mQuery = this.mongooseParser.parse(query);
    let searchDoc: string = mQuery.filter.searchDoc ; // chiave per ricercare in tutto il doc
    let coordinateFilter = new CoordinateFilter(mQuery.filter.latitude, mQuery.filter.longitude, mQuery.filter.distance)
    delete mQuery.filter.latitude;
    delete mQuery.filter.longitude;
    delete mQuery.filter.distance;
    delete mQuery.filter.searchDoc
    
      if(coordinateFilter.latitude && coordinateFilter.longitude && coordinateFilter.distance)
        mQuery.filter.geometry = {
          $near:
          {
            $geometry: {
              type: "Point",
              coordinates: [
                parseFloat(coordinateFilter.longitude.toString()),
                parseFloat(coordinateFilter.latitude.toString())
              ]
            },
            $maxDistance: parseFloat(coordinateFilter.distance.toString())
          }
        }

      if(searchDoc)  {
        mQuery.filter.$or = [ { name: { $regex: searchDoc, $options: 'i' }},{ desc: { $regex: searchDoc, $options: 'i' }} ]
      }
      //let uid = "62a4b356a999f69566175df6"
      let uid: any = await this.userService.getUserObjectId(req) ;
      
      return await this.locationModel
        .find(mQuery.filter)
        .populate('locationCategory')
        .populate('insertUid')
        .populate(uid ? {
          path: "saved",
          match: { uid: uid },
          select: 'cdate'
        }: {
          path: "saved",
        })
        .limit(query.limit)
        .skip(query.skip)
        .sort(query.sort)


    } catch (error) {
      this.logger.error(error.stack)
      throw new HttpException(error.stack, HttpStatus.EXPECTATION_FAILED);
    }
  }

  async findAllUploaded(req: Http2ServerRequest, query: any) {
    try {

      let uid: any = await this.userService.getUserObjectId(req) ?? '';

      return await this.locationModel
        .find({ insertUid: uid })
        .populate('locationCategory')
        .populate('insertUid')
        .populate({
          path: "saved",
          match: { uid: uid },
          select: 'cdate'
        })
        .limit(query.limit)
        .skip(query.skip)
        .sort(query.sort)

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

  aggregation(userObjId: string, query: MongoQueryModel): PipelineStage[] {

    let userFilter: any;
    if (userObjId && userObjId != "") {
      userFilter = {
        '$eq': [
          '$uid', new ObjectId(userObjId)
        ]
      }
    }
    return [
      {
        '$lookup': {
          'from': 'savelocations',
          'let': {
            'locationId': '$_id'
          },

          'pipeline': [
            {
              '$match': {
                '$expr': {
                  '$and': [
                    userFilter
                    , {
                      '$eq': [
                        '$location', '$$locationId'
                      ]
                    }
                  ]
                }
              }
            }
          ],
          'as': 'saved'
        }
      }, {
        '$lookup': {
          'from': 'users',
          'localField': 'insertUid',
          'foreignField': '_id',
          'as': 'insertUid'
        }
      }, {
        '$unwind': {
          'path': '$locationCategory',
          'preserveNullAndEmptyArrays': true
        }
      }, {
        '$lookup': {
          'from': 'locationcategories',
          'localField': 'locationCategory',
          'foreignField': '_id',
          'as': 'locationCategory'
        }
      }, {
        '$group': {
          '_id': '$_id',
          'name': {
            '$first': '$name'
          },
          'desc': {
            '$first': '$desc'
          },
          'indication': {
            '$first': '$indication'
          },
          'coordinate': {
            '$first': '$coordinate'
          },
          'periodAvaiable': {
            '$first': '$periodAvaiable'
          },
          'dayAvaiable': {
            '$first': '$dayAvaiable'
          },
          'cdate': {
            '$first': '$cdate'
          },
          'locationCategory': {
            '$push': {
              '$arrayElemAt': [
                '$locationCategory', 0
              ]
            }
          },
          'saved': {
            '$first': {
              '$cond': {
                'if': {
                  '$gt': [
                    {
                      '$size': '$saved'
                    }, 0
                  ]
                },
                'then': true,
                'else': false
              }
            }
          }
        }
      },
      {
        $match: query.filter

      }
    ]
  }
}
