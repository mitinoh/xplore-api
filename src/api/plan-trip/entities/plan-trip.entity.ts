

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Transform, Type } from "class-transformer";
import { Document, Schema as MongooseSchema, Types } from "mongoose";
import { LocationCategory } from "src/api/location-category/entities/location-category.entity";
import { Coordinate } from "src/api/location/entities/coordinate.interface";
import { PlannedTrip, PlannedTripSchema } from "./planned-trip.interface";

@Schema()
export class PlanTrip {
    @Prop()
    @Transform(({ value }) => value.toString())
    id: MongooseSchema.Types.ObjectId

    @Prop({required: true})
    tripName: string

    @Prop()
    goneDate: Date

    @Prop()
    returnDate: Date

    @Prop({required: true, type: Coordinate})
    coordinate: Coordinate

    @Prop()
    distance: number

    @Prop({required: true, type: [{ type: MongooseSchema.Types.ObjectId, ref: 'PlannedTrip' }] })
    plannedTrip: PlannedTrip[];

    @Prop([{ type: MongooseSchema.Types.ObjectId, ref: LocationCategory.name }])
    @Type(() => LocationCategory)
    avoidCategory: LocationCategory

    @Prop()
    cdate: Date
}

export type PlanTripDocument = PlanTrip & Document;
export const PlanTripSchema = SchemaFactory.createForClass(PlanTrip);