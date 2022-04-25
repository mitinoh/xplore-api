import { Module } from '@nestjs/common';
import { PlanTripService } from './plan-trip.service';
import { PlanTripController } from './plan-trip.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PlannedTrip } from './entities/planned-trip.interface';
import { PlanTrip, PlanTripSchema } from './entities/plan-trip.entity';
import { User, UserSchema } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PlanTrip.name, schema: PlanTripSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [PlanTripController],
  providers: [PlanTripService, UserService]
})
export class PlanTripModule {}
