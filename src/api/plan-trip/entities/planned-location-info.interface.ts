import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document, Schema as MongooseSchema, Types } from "mongoose";

export interface PlannedLocationInfo {
    date: Date;
}

export class PlannedLocationInfo {
    @Prop({type: Date})
    date: Date

}

export type PlannedLocationInfoDocument = PlannedLocationInfo & Document;
export const PlannedLocationInfoSchema = SchemaFactory.createForClass(PlannedLocationInfo);