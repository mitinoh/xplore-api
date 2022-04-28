

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Transform, Type } from "class-transformer";
import { Document, Schema as MongooseSchema, Types } from "mongoose";
import { LocationCategory } from "src/api/location-category/entities/location-category.entity";
import { Coordinate } from "src/api/location/entities/coordinate.interface";
import { PlannedLocation, PlannedLocationSchema } from "./planned-location.interface";

import { Location } from "src/api/location/entities/location.entity";
import { PlannedLocationInfo } from "./planned-location-info.interface";
import { User } from "src/api/user/entities/user.entity";
@Schema()
export class PlanTrip {
    @Prop()
    @Transform(({ value }) => value.toString())
    id: MongooseSchema.Types.ObjectId

    @Prop({required: true})
    tripName: string

    @Prop({type: Date})
    goneDate: Date

    @Prop({type: Date})
    returnDate: Date

    @Prop({required: true, type: Coordinate})
    coordinate: Coordinate

    @Prop()
    distance: number

    
    @Prop([{ type: PlannedLocation }])
    plannedLocation: Object;

/*
    @Prop({type: PlannedLocationInfo})
    @Type(() => PlannedLocationInfo)
    plannedLocationInfo: PlannedLocationInfo[];
*/
    
    @Prop([{ type: MongooseSchema.Types.ObjectId, ref: LocationCategory.name }])
    @Type(() => LocationCategory)
    avoidCategory: LocationCategory


    @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name })
    @Type(() => User)
    uid: User

    
    @Prop()
    cdate: Date
}

export type PlanTripDocument = PlanTrip & Document;
export const PlanTripSchema = SchemaFactory.createForClass(PlanTrip);