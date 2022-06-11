import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageService } from '../image/image.service';
import { User, UserSchema } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { VisitLocation, VisitLocationSchema } from './entities/visit-location.entity';
import { VisitLocationController } from './visit-location.controller';
import { VisitLocationService } from './visit-location.service';

@Module({
  imports: [
    User,
    MongooseModule.forFeature([
      { name: VisitLocation.name, schema: VisitLocationSchema },
      { name: User.name, schema: UserSchema },

    ]),
  ],
  controllers: [VisitLocationController],
  providers: [VisitLocationService, UserService, ImageService]
})
export class VisitLocationModule { }
