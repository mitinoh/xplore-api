import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { IsBase64 } from 'class-validator/types/decorator/string/IsBase64';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  @IsBase64()
  base64: string;
}
