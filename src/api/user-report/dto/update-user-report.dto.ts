import { PartialType } from '@nestjs/mapped-types';
import { CreateUserReportDto } from './create-user-report.dto';

export class UpdateUserReportDto extends PartialType(CreateUserReportDto) {}
