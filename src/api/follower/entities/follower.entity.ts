import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { Document, Schema as MongooseSchema } from "mongoose";
import { User } from "src/api/user/entities/user.entity";


@Schema()
export class Follower {

  @ApiProperty({ type: MongooseSchema.Types.ObjectId })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name })
  @Type(() => User)
  uid: MongooseSchema.Types.ObjectId

  @ApiProperty({ type: MongooseSchema.Types.ObjectId })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name })
  @Type(() => User)
  followed: MongooseSchema.Types.ObjectId

  @ApiProperty({ type: Boolean })
  @Prop(() => Boolean)
  blocked: Boolean

  @Prop({ type: Date })
  cdate: Date
}



export type FollowerDocument = Follower & Document;
export const FollowerSchema = SchemaFactory.createForClass(Follower);



