import { PartialType } from '@nestjs/mapped-types';
import { CreateVisitLocationDto } from './create-visit-location.dto';

export class UpdateVisitLocationDto extends PartialType(CreateVisitLocationDto) {}
