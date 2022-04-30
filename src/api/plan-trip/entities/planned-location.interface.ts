import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsMongoId, IsNotEmpty } from "class-validator";
import { Document, Schema as MongooseSchema, Types } from "mongoose";
import { type } from "os";
import { Location } from "src/api/location/entities/location.entity";


export type PlannedLocationDocument = PlannedLocation & Document;

export class PlannedLocation {
    @ApiProperty({type: Date})
    @IsNotEmpty()
    @Prop()
    @Type(() => Date)
    date: Date
    
    @ApiProperty({type: MongooseSchema.Types.ObjectId})
    @IsMongoId()
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: Location.name })
    @Type(() => Location)
    location: Location
}

export const PlannedLocationSchema = SchemaFactory.createForClass(PlannedLocation);