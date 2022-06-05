import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthService } from 'src/auth/auth.service';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { User, UserSchema } from './entities/user.entity';
import { ImageService } from '../image/image.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, ImageService ]
})
export class UserModule {}
