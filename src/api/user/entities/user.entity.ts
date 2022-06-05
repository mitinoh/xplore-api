
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { Document, Schema as MongooseSchema } from "mongoose";

@Schema()
export class User {
    @ApiProperty({ type: MongooseSchema.Types.ObjectId })
    @Prop(() => MongooseSchema.Types.ObjectId)
    @Transform(({ value }) => value.toString())
    id: MongooseSchema.Types.ObjectId

    @ApiProperty({ type: String })
    @Prop({ required: true })
    name: string

    @ApiProperty({ type: String })
    @Prop()
    bio: string

    @ApiProperty({ type: String })
    @Prop({ required: true })
    fid: string

    @Prop({ type: Date })
    cdate: Date
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
