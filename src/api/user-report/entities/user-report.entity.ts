import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";

import { Transform, Type } from "class-transformer";1
import { Document, Schema as MongooseSchema } from "mongoose";

@Schema()
export class UserReport {
  @ApiProperty({ type: MongooseSchema.Types.ObjectId })
  @Prop(() => MongooseSchema.Types.ObjectId)
  @Transform(({ value }) => value.toString())
  reported: MongooseSchema.Types.ObjectId
  
  @ApiProperty({ type: MongooseSchema.Types.ObjectId })
  @Prop(() => MongooseSchema.Types.ObjectId)
  @Transform(({ value }) => value.toString())
  reporter: MongooseSchema.Types.ObjectId

  @ApiProperty({ type: String })
  @Prop({ required: true })
  desc: string

  @ApiProperty({ type: Number })
  @Prop({ required: true })
  causal: number
}

export type UserReportDocument = UserReport & Document;
export const UserReportSchema = SchemaFactory.createForClass(UserReport);
