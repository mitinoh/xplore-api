import { Module } from '@nestjs/common';
import { NewLocationService } from './new-location.service';
import { NewLocationController } from './new-location.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { NewLocation, NewLocationSchema } from './entities/new-location.entity';
import { AuthService } from 'src/auth/auth.service';
import { User, UserSchema } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { ImageService } from '../image/image.service';

@Module({  
  imports: [
  MongooseModule.forFeature([
    { name: NewLocation.name, schema: NewLocationSchema },
    { name: User.name, schema: UserSchema },
  ]),
],
  controllers: [NewLocationController],
  providers: [NewLocationService, UserService, ImageService]
})
export class NewLocationModule {}
