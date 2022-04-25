import { Module } from '@nestjs/common';
import { LocationCategoryService } from './location-category.service';
import { LocationCategoryController } from './location-category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationCategory, LocationCategorySchema } from './entities/location-category.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LocationCategory.name, schema: LocationCategorySchema },
    ]),
  ],
  controllers: [LocationCategoryController],
  providers: [LocationCategoryService]
})
export class LocationCategoryModule {}
