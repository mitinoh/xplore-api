import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageService } from '../image/image.service';
import { User, UserSchema } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { PlanTrip, PlanTripSchema } from './entities/plan-trip.entity';
import { PlanTripController } from './plan-trip.controller';
import { PlanTripService } from './plan-trip.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PlanTrip.name, schema: PlanTripSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [PlanTripController],
  providers: [PlanTripService, UserService, ImageService]
})
export class PlanTripModule { }
