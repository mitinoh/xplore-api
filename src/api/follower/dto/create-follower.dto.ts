    
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsMongoId, IsString } from "class-validator";
import { Document, Schema as MongooseSchema, Types } from "mongoose";
export class CreateFollowerDto {

  @ApiProperty({type: MongooseSchema.Types.ObjectId, required: true})
  @IsMongoId()
  @Type(() => MongooseSchema.Types.ObjectId)
  followed: MongooseSchema.Types.ObjectId

  @ApiProperty({type: Boolean})
  @Type(() => Boolean)
  blocked: boolean  

  cdate: number = Date.now();

}
