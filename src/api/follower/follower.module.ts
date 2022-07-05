import { Module } from '@nestjs/common';
import { FollowerService } from './follower.service';
import { FollowerController } from './follower.controller';
import { UserService } from '../user/user.service';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { Follower, FollowerSchema } from './entities/follower.entity';
import { User, UserSchema } from '../user/entities/user.entity';
import { ImageService } from '../image/image.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Follower.name, schema: FollowerSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [FollowerController],
  providers: [FollowerService, UserService, ImageService]
})
export class FollowerModule {}
