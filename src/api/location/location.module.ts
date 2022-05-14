import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationSchema, Location } from './entities/location.entity';
import { AppService } from 'src/app.service';
import { LocationCategory, LocationCategorySchema } from '../location-category/entities/location-category.entity';
import { SaveLocationModule } from '../save-location/save-location.module';
import { SaveLocation, SaveLocationSchema } from '../save-location/entities/save-location.entity';
import { User, UserSchema } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
@Module({
  imports: [
    LocationCategory,
    SaveLocationModule,
    UserModule,
    MongooseModule.forFeature([
      { name: Location.name, schema: LocationSchema },
      { name: SaveLocation.name, schema: SaveLocationSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [LocationController],
  providers: [LocationService, AppService, UserService],
})
export class LocationModule {}
