import { Prop} from "@nestjs/mongoose";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsInt, IsMongoId, IsString } from "class-validator";

import { Document, Schema as MongooseSchema, Types } from "mongoose";

export class CreateUserReportDto {
  /*
  @ApiProperty({type: MongooseSchema.Types.ObjectId, required: true})
  @IsMongoId()
  @Type(() => MongooseSchema.Types.ObjectId)
  reporter: MongooseSchema.Types.ObjectId
  */
  @ApiProperty({type: MongooseSchema.Types.ObjectId, required: true})
  @IsMongoId()
  @Type(() => MongooseSchema.Types.ObjectId)
  reported: MongooseSchema.Types.ObjectId

  @ApiProperty({type: Number, required: true})
  @IsInt()
  @Type(() => Number)
  causal: number = -1

  @ApiProperty()
  @IsString()
  @Type(() => String)
  desc: string = "";

  cdate: number = Date.now();
}
