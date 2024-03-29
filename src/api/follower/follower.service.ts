import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserService } from '../user/user.service';
import { CreateFollowerDto } from './dto/create-follower.dto';
import { UpdateFollowerDto } from './dto/update-follower.dto';
import { Follower, FollowerDocument } from './entities/follower.entity';
import { AuthService } from 'src/auth/auth.service';
import { Model } from "mongoose";
import { Http2ServerRequest } from 'http2';
import { ObjectId } from 'bson';
import mongoose, {  mquery, PipelineStage } from 'mongoose';
import { MongoQueryModel } from 'nest-mongo-query-parser/dist/lib/model/mongo.query.model';
import { MongooseQueryParser } from 'mongoose-query-parser';
import { PlanTripService } from '../plan-trip/plan-trip.service';

@Injectable()
export class FollowerService {
  constructor(
    @InjectModel(Follower.name) private followerModel: Model<FollowerDocument>,
    @Inject('winston') private readonly logger: Logger,
    private authService: AuthService,
    private readonly userService: UserService,
    private readonly planTripService: PlanTripService) { }
    mongooseParser = new MongooseQueryParser()

  async follow(req: Http2ServerRequest, followed: string) {
    try {
      let uid: any = await this.userService.getUserObjectId(req);
      let newCreateFollower = new this.followerModel({ followed:  followed, uid: uid });
      return await newCreateFollower.save();
    } catch (error) {
      this.logger.error(error.message)
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED);
    }
  }

  // TODO: invece che ritornare questo e basta spostare in userService e ritornare tutit i count che servono
  async getFollowCount(req: Http2ServerRequest, query: MongoQueryModel) {

    let mQuery = this.mongooseParser.parse(query)
    let uidd: string = mQuery.filter.uid;
    delete mQuery.filter.uid

    let uid: any = await this.userService.getUserObjectId(req, uidd)
    let follwing: number = await this.followerModel.find({uid: uid}).countDocuments();
    let follwed: number = await this.followerModel.find({followed: uid}).countDocuments();
    let plannedTrip: number = await this.planTripService.getCount(req, query);
    return {
      "following": follwing,
      "followed": follwed,
      "plannedTrip": plannedTrip

    }
  }

  async getFollow(req: Http2ServerRequest, query: MongoQueryModel) {

    let mQuery = this.mongooseParser.parse(query)
    let uidd: string = mQuery.filter.uid;
    delete mQuery.filter.uid
    
    let uid: any = await this.userService.getUserObjectId(req, uidd)

    let following: any = await this.followerModel.find({uid: uid}).populate("uid").populate("followed");
    let followed: any = await this.followerModel.find({followed: uid}).populate("uid").populate("followed");
   
    return {
       "following": following,
       "followed": followed
    }
  }

  async isFollowing(req: Http2ServerRequest, query: MongoQueryModel) {

    let mQuery = this.mongooseParser.parse(query)
    let followed: string = mQuery.filter.uid;
    delete mQuery.filter.uid
    
    let uid: any = await this.userService.getUserObjectId(req)

    let following: any = await this.followerModel.find({uid: uid, followed: followed});
    return (following.length > 0);
  }


  /*
  findAll() {
    return `This action returns all follower`;
  }

  findOne(id: number) {
    return `This action returns a #${id} follower`;
  }

  update(id: number, updateFollowerDto: UpdateFollowerDto) {
    return `This action updates a #${id} follower`;
  }
*/
  async unfollow(req: Http2ServerRequest, id: string) {
    try {
      let uid: any = await this.userService.getUserObjectId(req);
      let followed = new mongoose.Types.ObjectId(id)
      let ret = await this.followerModel.deleteOne({ uid: uid, followed: followed})
      return ret.deletedCount > 0
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED);
    }
  }
}
