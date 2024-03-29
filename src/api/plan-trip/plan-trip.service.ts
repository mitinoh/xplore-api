import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'bson';
import { Http2ServerRequest } from 'http2';
import mongoose, { Model, mquery, PipelineStage } from 'mongoose';
import { MongooseQueryParser } from 'mongoose-query-parser';
import { MongoQueryModel } from 'nest-mongo-query-parser';
import { BooleanArraySupportOption } from 'prettier';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from '../user/user.service';
import { CreatePlanTripDto } from './dto/create-plan-trip.dto';
import { UpdatePlanTripDto } from './dto/update-plan-trip.dto';
import { PlanTrip } from './entities/plan-trip.entity';
import { PlannedLocation } from './entities/planned-location.interface';

@Injectable()
export class PlanTripService {

  constructor(
    @InjectModel(PlanTrip.name) private newPlanTripnModel: Model<PlanTrip>,
    @Inject('winston') private readonly logger: Logger,
    private authService: AuthService,
    private readonly userService: UserService) { }
  mongooseParser = new MongooseQueryParser();

  async create(req: Http2ServerRequest, createPlanTripDto: CreatePlanTripDto) {
    try {
      createPlanTripDto.plannedLocation.forEach((plannedLocation: any) => {
        let l = { _id: plannedLocation.location['_id'] }
        plannedLocation.location = {}
        plannedLocation.location = l
      })

      let uid: any = await this.userService.getUserObjectId(req) ?? '';
      let newCreatePlanTrip = new this.newPlanTripnModel({ ...createPlanTripDto, uid: uid });
      return await newCreatePlanTrip.save();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED);
    }
  }

  async findAll(req: Http2ServerRequest, query: any) {
    try {
      let uid: any = await this.userService.getUserObjectId(req) ?? undefined;
      let mQuery = this.mongooseParser.parse(query)
      mQuery.filter.uid = uid
      return this.newPlanTripnModel
        .find(mQuery.filter)
        .populate({
          path: 'plannedLocation',
          populate: {
            path: 'location', // TODO: togliere fid 
            model: 'Location'
          }
        })
        .populate("avoidCategory")
        .populate({
          path: "uid",
          match: { uid: uid }
        })
        .limit(mQuery.limit)
        .skip(mQuery.skip)
        .sort(mQuery.sort)
        .select(mQuery.select)
    } catch (error) {
      this.logger.error(error.toString())
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED);
    }
  }

  async getCount(req: Http2ServerRequest, query: any) {
    try {

      let mQuery = this.mongooseParser.parse(query)
      let uidd: string = mQuery.filter.uid;
      delete mQuery.filter.uid

      let uid: any = await this.userService.getUserObjectId(req, uidd);
      mQuery.filter.uid = uid
      return this.newPlanTripnModel
        .find(mQuery.filter).countDocuments()
    } catch (error) {
      this.logger.error(error.toString())
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED);
    }
  }

  async findOne(id: string) {
    try {
      return await this.newPlanTripnModel.findOne({ _id: id });
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED);
    }
  }

  async update(id: string, updatePlanTripDto: UpdatePlanTripDto) {
    try {
      return await this.newPlanTripnModel.findOneAndUpdate(
        { _id: id },
        updatePlanTripDto,
        { new: false }
      )
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED);
    }
  }

  async remove(id: string) {
    try {
      let objId = new mongoose.Types.ObjectId(id)
      let ret = await this.newPlanTripnModel.deleteOne({ _id: objId })
      return ret.deletedCount > 0
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED);
    }
  }

  // Quando sarà necessario aggiungere anche select e sort 
  getMongoAggregation(query: MongoQueryModel): PipelineStage[] {

    let uidAggregation: PipelineStage =
    {
      '$match': {
        'uid': new ObjectId(query.filter["uid"])
      }
    }


    let returnDateAggregation: PipelineStage = { '$match': {} } // valore di default

    if (query.filter.current === true) {
      returnDateAggregation =
      {
        '$match': {
          '$and': [
            { 'returnDate': { '$gt': new Date() } },
            { 'goneDate': { '$lt': new Date() } }
          ]
        }
      }
    }
    else if (query.filter.future === true) {
      returnDateAggregation =
      {
        '$match': {
          'returnDate': {
            '$gt': new Date()
          }
        }

      }
    }

    else if (query.filter.future === false) {
      returnDateAggregation =
      {
        '$match': {
          'returnDate': {
            '$lt': new Date()
          }
        }

      }
    }

    let limitAggregation: PipelineStage = { '$limit': query.limit ?? 999999999 }
    let skipAggregation: PipelineStage = { '$skip': query.skip ?? 0 }

    let aggregation: PipelineStage[] = [

      uidAggregation,
      returnDateAggregation,
      {
        '$unwind': {
          'path': '$plannedLocation',
          'preserveNullAndEmptyArrays': true
        }
      }, {
        '$addFields': {
          'plannedLocation.location': {
            '$toObjectId': '$plannedLocation.location'
          }
        }
      }, {
        '$lookup': {
          'from': 'locations',
          'localField': 'plannedLocation.location',
          'foreignField': '_id',
          'as': 'plannedLocation.location'
        }
      }, {
        '$unwind': {
          'path': '$plannedLocation.location',
          'preserveNullAndEmptyArrays': false
        }
      }, {
        '$group': {
          '_id': '$_id',
          'uid': {
            '$first': '$uid'
          },
          'tripName': {
            '$first': '$tripName'
          },
          'plannedLocation': {
            '$push': '$plannedLocation'
          },
          'coordinate': {
            '$first': '$coordinate'
          },
          'distance': {
            '$first': '$distance'
          },
          'avoidCategory': {
            '$push': '$avoidCategory'
          },
          'returnDate': {
            '$first': '$returnDate'
          },
          'goneDate': {
            '$first': '$goneDate'
          },
          'cdate': {
            '$first': '$cdate'
          },
          '__v': {
            '$first': '$__v'
          }
        }
      }, {
        '$unwind': {
          'path': '$avoidCategory',
          'preserveNullAndEmptyArrays': true
        }
      }, {
        '$lookup': {
          'from': 'locationcategories',
          'localField': 'avoidCategory',
          'foreignField': '_id',
          'as': 'avoidCategory'
        }
      }, {
        '$unwind': {
          'path': '$avoidCategory',
          'preserveNullAndEmptyArrays': true
        }
      }, {
        '$group': {
          '_id': '$_id',
          'uid': {
            '$first': '$uid'
          },
          'tripName': {
            '$first': '$tripName'
          },
          'plannedLocation': {
            '$push': '$plannedLocation'
          },
          'coordinate': {
            '$first': '$coordinate'
          },
          'distance': {
            '$first': '$distance'
          },
          'avoidCategory': {
            '$push': '$avoidCategory'
          },
          'returnDate': {
            '$first': '$returnDate'
          },
          'goneDate': {
            '$first': '$goneDate'
          },
          'cdate': {
            '$first': '$cdate'
          },
          '__v': {
            '$first': '$__v'
          }
        }
      }, {
        '$lookup': {
          'from': 'users',
          'localField': 'uid',
          'foreignField': '_id',
          'as': 'uid'
        }
      }, {
        '$unwind': {
          'path': '$uid',
          'preserveNullAndEmptyArrays': true
        }
      }, {
        '$sort': {
          'goneDate': 1
        }
      },
      skipAggregation,
      limitAggregation
    ]
    return aggregation
  }

  getYesterdayDate() {
    return new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
  }

  getTomorrowDate() {
    return new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  }

}
