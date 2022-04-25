
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Transform, Type } from "class-transformer";
import { Document, Schema as MongooseSchema, Types } from "mongoose";

@Schema()
export class User {
    @Prop()
    @Transform(({ value }) => value.toString())
    id: MongooseSchema.Types.ObjectId
    
    @Prop({required: true})
    name: string

    @Prop()
    fid: string

    @Prop()
    cdate: Date
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
