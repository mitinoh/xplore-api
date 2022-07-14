import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Http2ServerRequest } from 'http2';
import mongoose, { Model } from 'mongoose';
import { MongooseQueryParser } from 'mongoose-query-parser';
import { MongoQueryModel } from 'nest-mongo-query-parser';
import { AuthService } from 'src/auth/auth.service';
import { ImageService } from '../image/image.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import { ObjectId } from 'bson';

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @Inject('winston') private readonly logger: Logger,
    private authService: AuthService,
    private imageService: ImageService) { }
  mongooseParser = new MongooseQueryParser()

  async create(req: Http2ServerRequest, createUserDto: CreateUserDto) {
    try {
      let fid: string = await this.authService.getUserToken(req);
      let newUser = new this.userModel({ ...createUserDto, fid: fid });
      return await newUser.save();
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED);
    }
  }

  async findAll(query: any) {
    try {
      let mQuery = this.mongooseParser.parse(query);
      return await this.userModel
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
      return await this.userModel.findOne({ _id: id });
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED);
    }
  }

  async findByFid(id: string) {
    try {
      return await this.userModel.findOne({ fid: id });
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED);
    }
  }

  async update(req: Http2ServerRequest, updateUserDto: UpdateUserDto) {
    try {
      let uid: any = await this.getUserObjectId(req) ?? '';
      let base64: string = updateUserDto.base64;
      delete updateUserDto.base64

      if (base64)
        this.imageService.create(uid, { base64: base64, entity: "user" })
      return await this.userModel.findOneAndUpdate({ _id: uid },
        updateUserDto, {
        new: false
      })
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED);
    }
  }

  async remove(id: string) {
    try {
      let objId = new mongoose.Types.ObjectId(id)
      let ret = await this.userModel.deleteOne({ _id: objId })
      return ret.deletedCount > 0
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED);
    }
  }


  async getUserObjectId(req: any, uid?: string) {
    try {

      if (uid) 
        return new ObjectId(uid)
      let fid: string = await this.authService.getUserToken(req)
      if (fid && fid != null && fid.trim() != "") {

        let userObj = await this.findByFid(fid)
        return userObj._id
      }
      return undefined
    } catch (error) {
      this.logger.error(error.message)
      return undefined;
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED);

    }

  }
}
