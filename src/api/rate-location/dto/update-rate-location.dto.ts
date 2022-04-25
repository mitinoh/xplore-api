import { PartialType } from '@nestjs/mapped-types';
import { CreateRateLocationDto } from './create-rate-location.dto';

export class UpdateRateLocationDto extends PartialType(CreateRateLocationDto) {}
