import { PartialType } from '@nestjs/mapped-types';
import { CreateSaveLocationDto } from './create-save-location.dto';

export class UpdateSaveLocationDto extends PartialType(CreateSaveLocationDto) {}
