import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { Document, Schema as MongooseSchema } from "mongoose";


@Schema()
export class Follower {

  @ApiProperty({ type: MongooseSchema.Types.ObjectId })
  @Prop(() => MongooseSchema.Types.ObjectId)
  @Transform(({ value }) => value.toString())
  uid: MongooseSchema.Types.ObjectId

  @ApiProperty({ type: MongooseSchema.Types.ObjectId })
  @Prop(() => MongooseSchema.Types.ObjectId)
  @Transform(({ value }) => value.toString())
  followed: MongooseSchema.Types.ObjectId

  @ApiProperty({ type: Boolean })
  @Prop(() => Boolean)
  blocked: Boolean

  @Prop({ type: Date })
  cdate: Date
}



export type FollowerDocument = Follower & Document;
export const FollowerSchema = SchemaFactory.createForClass(Follower);



