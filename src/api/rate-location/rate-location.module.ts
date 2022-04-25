import { Module } from '@nestjs/common';
import { RateLocationService } from './rate-location.service';
import { RateLocationController } from './rate-location.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RateLocation, RateLocationSchema } from './entities/rate-location.entity';
import { UserService } from '../user/user.service';
import { User, UserSchema } from '../user/entities/user.entity';

@Module({
  imports: [
    User,
    MongooseModule.forFeature([
      { name: RateLocation.name, schema: RateLocationSchema },
      { name: User.name, schema: UserSchema },
      
    ]),
  ],
  controllers: [RateLocationController],
  providers: [RateLocationService, UserService]
})
export class RateLocationModule {}
