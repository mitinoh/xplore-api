import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationSchema, Location } from './entities/location.entity';
import { AppService } from 'src/app.service';
import { LocationCategory, LocationCategorySchema } from '../location-category/entities/location-category.entity';
@Module({
  imports: [
    LocationCategory,
    MongooseModule.forFeature([
      { name: Location.name, schema: LocationSchema },
    ]),
  ],
  controllers: [LocationController],
  providers: [LocationService, AppService],
})
export class LocationModule {}
