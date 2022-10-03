import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Http2ServerRequest } from 'http2';
import mongoose, { Model, Schema as MongooseSchema } from 'mongoose';
import { MongooseQueryParser } from 'mongoose-query-parser';
import { MongoQueryModel } from 'nest-mongo-query-parser';
import { AuthService } from 'src/auth/auth.service';
import { ImageService } from '../image/image.service';
import { UserService } from '../user/user.service';
import { CreateNewLocationDto } from './dto/create-new-location.dto';
import { UpdateNewLocationDto } from './dto/update-new-location.dto';
import { NewLocation, NewLocationDocument } from './entities/new-location.entity';

@Injectable()
export class NewLocationService {

  constructor(
    @InjectModel(NewLocation.name) private newLocationModel: Model<NewLocationDocument>,
    @Inject('winston') private readonly logger: Logger,
    private authService: AuthService,
    private readonly userService: UserService,
    private readonly imageService: ImageService
  ) { }
  mongooseParser = new MongooseQueryParser()

  async create(req: Http2ServerRequest, createNewLocationDto: CreateNewLocationDto) {

    try {
      let uid: any = await this.userService.getUserObjectId(req);
      let newCreateNewLocation = new this.newLocationModel({ ...createNewLocationDto, uid: uid });
      let newLocationObj = await newCreateNewLocation.save();

      return newLocationObj;
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED);
    }
  }

  async findAll(req: Http2ServerRequest, query: any) {
    try {
      let mQuery = this.mongooseParser.parse(query)
      let uid: any = await this.userService.getUserObjectId(req) ?? '';
      return await this.newLocationModel
        .find(mQuery)
        .populate('locationCategory')
        .populate('uid')
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
      return await this.newLocationModel
        .findOne({ _id: id })
        .populate('locationCategory')
        .populate('uid');
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED);
    }
  }

  async update(id: string, updateNewLocationDto: UpdateNewLocationDto) {
    try {
      return await this.newLocationModel.findOneAndUpdate(
        { _id: id },
        updateNewLocationDto,
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
      let ret = await this.newLocationModel.deleteOne({ _id: objId })
      return ret.deletedCount > 0
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED);
    }
  }
}
