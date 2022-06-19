

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Transform, Type } from "class-transformer";
import { Document, Schema as MongooseSchema } from "mongoose";
import { LocationCategory } from "src/api/location-category/entities/location-category.entity";
import { PlannedLocation } from "./planned-location.interface";

import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/api/user/entities/user.entity";
import { Geometry } from "src/api/location/entities/geometry.interface";
@Schema({ toJSON: { virtuals: true, getters: true }, toObject: { virtuals: true, getters: true }})
export class PlanTrip {

    @ApiProperty({ type: MongooseSchema.Types.ObjectId })
    @Prop()
    @Transform(({ value }) => value.toString())
    id: MongooseSchema.Types.ObjectId

    @ApiProperty()
    @Prop({ required: true })
    tripName: string

    @ApiProperty({ type: Date })
    @Prop({ type: Date })
    goneDate: Date

    @ApiProperty({ type: Date })
    @Prop({ type: Date })
    returnDate: Date

    /*
    @ApiProperty({ type: Coordinate })
    @Prop({ required: true, type: Coordinate })
    coordinate: Coordinate
    */

    @ApiProperty({ type: Number })
    @Prop()
    distance: number

    @ApiProperty({ type: [PlannedLocation] })
    @Prop([{ type: PlannedLocation }])
    plannedLocation: PlannedLocation;

    @ApiProperty({ type: MongooseSchema.Types.ObjectId })
    @Prop([{ type: MongooseSchema.Types.ObjectId, ref: LocationCategory.name }])
    @Type(() => LocationCategory)
    avoidCategory: LocationCategory

    @ApiProperty({ type: MongooseSchema.Types.ObjectId })
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name })
    @Type(() => User)
    uid: User

    @ApiProperty({ type: Geometry })
    @Prop({ type: Geometry , index: "2dsphere"})
    @Type(() => Geometry)
    geometry: Geometry

    
    @Prop()
    cdate: Date
}

export type PlanTripDocument = PlanTrip & Document;
export const PlanTripSchema = SchemaFactory.createForClass(PlanTrip);