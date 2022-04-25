import { PartialType } from '@nestjs/mapped-types';
import { CreateNewLocationDto } from './create-new-location.dto';

export class UpdateNewLocationDto extends PartialType(CreateNewLocationDto) {}
