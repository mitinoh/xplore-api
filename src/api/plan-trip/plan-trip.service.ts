import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Http2ServerRequest } from 'http2';
import { MongoQueryModel } from 'nest-mongo-query-parser';
import { CreatePlanTripDto } from './dto/create-plan-trip.dto';
import { UpdatePlanTripDto } from './dto/update-plan-trip.dto';
import { PlanTrip } from './entities/plan-trip.entity';
import { Model } from "mongoose";
import mongoose from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from '../user/user.service';

@Injectable()
export class PlanTripService {

  constructor(
    @InjectModel(PlanTrip.name) private newPlanTripnModel: Model<PlanTrip>,
    @Inject('winston')  private readonly logger: Logger,
     private authService: AuthService,
     private readonly userService: UserService) { }

  async create(req:Http2ServerRequest, createPlanTripDto: CreatePlanTripDto) {
      try {
        let uid: any = await this.userService.getUserObjectId(req) ?? '';
        let newCreatePlanTrip = new this.newPlanTripnModel({...createPlanTripDto, uid: uid});
      return await newCreatePlanTrip.save();
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED);
    }
  }

  async findAll(query: MongoQueryModel) {
    try {
      return await this.newPlanTripnModel
        .find(query.filter)
        .populate('avoidCategory')
        .populate('plannedTrip')
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
      let ret = await this.newPlanTripnModel.deleteOne({ _id: objId })
      return ret.deletedCount > 0
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED);
    }
  }
}
