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

@Injectable()
export class FollowerService {
  constructor(
    @InjectModel(Follower.name) private followerModel: Model<FollowerDocument>,
    @Inject('winston') private readonly logger: Logger,
    private authService: AuthService,
    private readonly userService: UserService) { }

  async create(req: Http2ServerRequest, createFollowerDto: CreateFollowerDto) {
    try {
      let uid: any = await this.userService.getUserObjectId(req);
      let newCreateFollower = new this.followerModel({ ...createFollowerDto, uid: uid });
      return await newCreateFollower.save();
    } catch (error) {
      this.logger.error(error.message)
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED);
    }
  }

  async getFollowCount(req: Http2ServerRequest) {
   // let uid: any = await this.userService.getUserObjectId(req);
   let uid: any = new ObjectId("62b8c9cabb48ee55a97e465c")  
   
   let follwing: number = await this.followerModel.find({uid: uid}).countDocuments();
   let follwed: number = await this.followerModel.find({followed: uid}).countDocuments();
   return {
      "following": follwing,
      "followed": follwed
   }
 }

  async getFollow(req: Http2ServerRequest) {
    let uid: any = await this.userService.getUserObjectId(req);
   // let uid: any =  new ObjectId("62b8c9cabb48ee55a97e465c")  

    let follwing: any = await this.followerModel.find({uid: uid}).populate("followed");
    let follwed: any = await this.followerModel.find({followed: uid}).populate("uid");
    return {
       "following": follwing,
       "followed": follwed
    }
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
  async remove(req: Http2ServerRequest, id: string) {
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
