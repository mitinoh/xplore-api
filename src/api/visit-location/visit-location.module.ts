import { Module } from '@nestjs/common';
import { VisitLocationService } from './visit-location.service';
import { VisitLocationController } from './visit-location.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from '../user/user.service';
import { User, UserSchema } from '../user/entities/user.entity';
import { VisitLocation, VisitLocationSchema } from './entities/visit-location.entity';

@Module({
  imports: [
    User,
    MongooseModule.forFeature([
      { name: VisitLocation.name, schema: VisitLocationSchema },
      { name: User.name, schema: UserSchema },
      
    ]),
  ],
  controllers: [VisitLocationController],
  providers: [VisitLocationService, UserService]
})
export class VisitLocationModule {}
