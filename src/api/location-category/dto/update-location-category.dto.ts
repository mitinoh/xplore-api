import { PartialType } from '@nestjs/mapped-types';
import { CreateLocationCategoryDto } from './create-location-category.dto';

export class UpdateLocationCategoryDto extends PartialType(CreateLocationCategoryDto) {}
