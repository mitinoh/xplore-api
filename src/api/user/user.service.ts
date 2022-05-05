import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Http2ServerRequest } from 'http2';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import { Model } from "mongoose";
import { AuthService } from 'src/auth/auth.service';
import { MongoQueryModel } from 'nest-mongo-query-parser';
import mongoose from 'mongoose';

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @Inject('winston') private readonly logger: Logger,
    private authService: AuthService) { }

  async create(req: Http2ServerRequest, createUserDto: CreateUserDto) {
    try {
      let fid: string = await this.authService.getUserToken(req);
      let newUser = new this.userModel({...createUserDto, fid: fid}); 
      return await newUser.save();
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(error.message,HttpStatus.EXPECTATION_FAILED);
    }
  }

  async findAll(query: MongoQueryModel) {
    try {
      return await this.userModel
        .find(query.filter)
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
      return await this.userModel.findOne({ _id: id });
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(error.message,HttpStatus.EXPECTATION_FAILED);
    }
  }

  async findByFid(id: string) {
    try {
      return await this.userModel.findOne({ fid: id });
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(error.message,HttpStatus.EXPECTATION_FAILED);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      return await this.userModel.findOneAndUpdate({ _id: id },
        updateUserDto, {
        new: false
      })
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(error.message,HttpStatus.EXPECTATION_FAILED);
    }
  }

  async remove(id: string) {
    try {
      let objId = new mongoose.Types.ObjectId(id)
      let ret = await this.userModel.deleteOne({ _id: objId })
      return ret.deletedCount > 0
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(error.message,HttpStatus.EXPECTATION_FAILED);
    }
  }


  async getUserObjectId(req: any) {
    try {
      let fid: string = await this.authService.getUserToken(req) 
      return await this.findByFid(fid)
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED);
    }

  }
}
