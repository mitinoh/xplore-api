import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from 'src/app.service';
import { ImageService } from '../image/image.service';
import { LocationCategory, LocationCategorySchema } from '../location-category/entities/location-category.entity';
import { LocationCategoryService } from '../location-category/location-category.service';
import { SaveLocation, SaveLocationSchema } from '../save-location/entities/save-location.entity';
import { SaveLocationModule } from '../save-location/save-location.module';
import { User, UserSchema } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { Location, LocationSchema } from './entities/location.entity';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
@Module({
  imports: [
    LocationCategory,
    SaveLocationModule,
    UserModule,
    MongooseModule.forFeature([
      { name: Location.name, schema: LocationSchema },
      { name: LocationCategory.name, schema: LocationCategorySchema },
      { name: SaveLocation.name, schema: SaveLocationSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [LocationController],
  providers: [LocationService, AppService, UserService, ImageService, LocationCategoryService],
})
export class LocationModule { }
