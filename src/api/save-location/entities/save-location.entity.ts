import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Transform, Type } from "class-transformer";
import { Location } from "src/api/location/entities/location.entity";

import { Document, Schema as MongooseSchema, Types } from "mongoose";
import { User } from "src/api/user/entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";

@Schema()
export class SaveLocation {

    @ApiProperty({type: MongooseSchema.Types.ObjectId})
    @Prop(() => MongooseSchema.Types.ObjectId)
    @Transform(({ value }) => value.toString())
    id: MongooseSchema.Types.ObjectId

    @ApiProperty({type: User})
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name })
    @Type(() => User)
    uid: User


    @ApiProperty({type: Location})
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: Location.name })
    @Type(() => Location)
    location: Location

    @Prop()
    cdate: Date;
}

export type SaveLocationDocument = SaveLocation & Document;
export const SaveLocationSchema = SchemaFactory.createForClass(SaveLocation);