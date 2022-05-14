import { Module } from '@nestjs/common';
import { SaveLocationService } from './save-location.service';
import { SaveLocationController } from './save-location.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { NewLocationSchema } from '../new-location/entities/new-location.entity';
import { SaveLocation, SaveLocationSchema } from './entities/save-location.entity';
import { User, UserSchema } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SaveLocation.name, schema: SaveLocationSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [SaveLocationController],
  providers: [SaveLocationService, UserService],
  exports: [SaveLocationModule]
})
export class SaveLocationModule {}
