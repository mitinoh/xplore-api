import { Module } from '@nestjs/common';
import { UserReportService } from './user-report.service';
import { UserReportController } from './user-report.controller';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { User, UserSchema } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { UserReport, UserReportSchema } from './entities/user-report.entity';
import { ImageService } from '../image/image.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserReport.name, schema: UserReportSchema},
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [UserReportController],
  providers: [UserReportService, UserService, ImageService]
})
export class UserReportModule {}
