import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { Document, Schema as MongooseSchema, Types } from "mongoose";
import { Location } from "src/api/location/entities/location.entity";


export type PlannedTripDocument = PlannedTrip & Document;

export class PlannedTrip {
    @Prop()
    date: Date
    
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: Location.name })
    @Type(() => Location)
    location: Location
}

export const PlannedTripSchema = SchemaFactory.createForClass(PlannedTrip);