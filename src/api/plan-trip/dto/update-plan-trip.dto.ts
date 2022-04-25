import { PartialType } from '@nestjs/mapped-types';
import { CreatePlanTripDto } from './create-plan-trip.dto';

export class UpdatePlanTripDto extends PartialType(CreatePlanTripDto) {}
