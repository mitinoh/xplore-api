
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Transform, Type } from "class-transformer";
import { Document, Schema as MongooseSchema, Types } from "mongoose";
import { User } from "src/api/user/entities/user.entity";
import { Location } from "src/api/location/entities/location.entity";
import { ApiProperty } from "@nestjs/swagger";
import { type } from "os";

@Schema()
export class RateLocation {
    
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


    @ApiProperty({type: Number})
    @Prop({ type:Number })
    @Type(() => Number)
    rate: number

    @Prop({type: Date})
    cdate: Date
}

export type RateLocationDocument = RateLocation & Document;
export const RateLocationSchema = SchemaFactory.createForClass(RateLocation);