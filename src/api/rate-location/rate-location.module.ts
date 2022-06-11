import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageService } from '../image/image.service';
import { User, UserSchema } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { RateLocation, RateLocationSchema } from './entities/rate-location.entity';
import { RateLocationController } from './rate-location.controller';
import { RateLocationService } from './rate-location.service';

@Module({
  imports: [
    User,
    MongooseModule.forFeature([
      { name: RateLocation.name, schema: RateLocationSchema },
      { name: User.name, schema: UserSchema },

    ]),
  ],
  controllers: [RateLocationController],
  providers: [RateLocationService, UserService, ImageService]
})
export class RateLocationModule { }
