import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsMongoId } from "class-validator";
import { Document, Schema as MongooseSchema, Types } from "mongoose";
import { type } from "os";
import { Location } from "src/api/location/entities/location.entity";


export type PlannedLocationDocument = PlannedLocation & Document;

export class PlannedLocation {
    @Prop()
    date: Date
    
    @IsMongoId()
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: Location.name })
    @Type(() => Location)
    location: Location
}

export const PlannedLocationSchema = SchemaFactory.createForClass(PlannedLocation);