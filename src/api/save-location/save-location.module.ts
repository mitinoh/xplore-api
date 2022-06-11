import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageService } from '../image/image.service';
import { User, UserSchema } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { SaveLocation, SaveLocationSchema } from './entities/save-location.entity';
import { SaveLocationController } from './save-location.controller';
import { SaveLocationService } from './save-location.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SaveLocation.name, schema: SaveLocationSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [SaveLocationController],
  providers: [SaveLocationService, UserService, ImageService],
  exports: [SaveLocationModule]
})
export class SaveLocationModule { }
