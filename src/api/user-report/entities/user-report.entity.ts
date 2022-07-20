import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";

import { Transform, Type } from "class-transformer";1
import { Document, Schema as MongooseSchema } from "mongoose";
import { User } from "src/api/user/entities/user.entity";

@Schema()
export class UserReport {

  @ApiProperty({ type: MongooseSchema.Types.ObjectId })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name })
  @Type(() => User)
  reported: MongooseSchema.Types.ObjectId
  
  @ApiProperty({ type: MongooseSchema.Types.ObjectId })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name })
  @Type(() => User)
  reporter: MongooseSchema.Types.ObjectId

  @ApiProperty({ type: String })
  @Prop()
  desc: string

  @ApiProperty({ type: Number })
  @Prop({ required: true })
  causal: number
}

export type UserReportDocument = UserReport & Document;
export const UserReportSchema = SchemaFactory.createForClass(UserReport);
