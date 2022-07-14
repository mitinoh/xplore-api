import { Module } from '@nestjs/common';
import { FollowerService } from './follower.service';
import { FollowerController } from './follower.controller';
import { UserService } from '../user/user.service';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { Follower, FollowerSchema } from './entities/follower.entity';
import { User, UserSchema } from '../user/entities/user.entity';
import { ImageService } from '../image/image.service';
import { PlanTripService } from '../plan-trip/plan-trip.service';
import { PlanTrip, PlanTripSchema } from '../plan-trip/entities/plan-trip.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Follower.name, schema: FollowerSchema },
      { name: User.name, schema: UserSchema },
      { name: PlanTrip.name, schema: PlanTripSchema },
    ]),
  ],
  controllers: [FollowerController],
  providers: [FollowerService, UserService, PlanTripService, ImageService]
})
export class FollowerModule {}
