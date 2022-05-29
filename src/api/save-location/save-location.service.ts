import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Http2ServerRequest } from 'http2';
import mongoose, { Model } from 'mongoose';
import { MongoQueryModel } from 'nest-mongo-query-parser';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from '../user/user.service';
import { CreateSaveLocationDto } from './dto/create-save-location.dto';
import { UpdateSaveLocationDto } from './dto/update-save-location.dto';
import { SaveLocation, SaveLocationDocument } from './entities/save-location.entity';

@Injectable()
export class SaveLocationService {

  constructor(
    @InjectModel(SaveLocation.name) private saveLocationModel: Model<SaveLocationDocument>,
    @Inject('winston') private readonly logger: Logger,
    private authService: AuthService,
    private readonly userService: UserService) { }

  async create(req: Http2ServerRequest, createSaveLocationDto: CreateSaveLocationDto) {
    try {
      let uid: any = await this.userService.getUserObjectId(req) ?? '';
      let newCreateSaveLocation = new this.saveLocationModel({ ...createSaveLocationDto, uid: uid });
      return await newCreateSaveLocation.save();
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED);
    }
  }

  async findAll(query: MongoQueryModel) {
    try {
      return await this.saveLocationModel
        .find(query.filter)
        .populate('uid')
        // .populate('location')
        .populate({
          path: 'location',
          populate: {
            path: 'locationCategory',
            model: 'LocationCategory'
          }
        })
        .populate({
          path: 'location',
          populate: {
            path: 'insertUid',
            model: 'User'
          }
        })
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
      return await this.saveLocationModel.findOne({ _id: id });
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED);
    }
  }

  async update(id: string, updateSaveLocationDto: UpdateSaveLocationDto) {
    try {
      return await this.saveLocationModel.findOneAndUpdate(
        { _id: id },
        updateSaveLocationDto,
        { new: false }
      )
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED);
    }
  }

  async remove(req: Http2ServerRequest, id: string) {
    try {

      let objId = new mongoose.Types.ObjectId(id)
      let uid: any = await this.userService.getUserObjectId(req) ?? '';
      let ret = await this.saveLocationModel.deleteOne({ locationId: objId, uid: uid._id.toString() })
      return ret.deletedCount > 0
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED);
    }
  }
}
