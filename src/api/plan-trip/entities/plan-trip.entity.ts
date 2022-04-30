

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Transform, Type } from "class-transformer";
import { Document, Schema as MongooseSchema, Types } from "mongoose";
import { LocationCategory } from "src/api/location-category/entities/location-category.entity";
import { Coordinate } from "src/api/location/entities/coordinate.interface";
import { PlannedLocation, PlannedLocationSchema } from "./planned-location.interface";

import { Location } from "src/api/location/entities/location.entity";
import { User } from "src/api/user/entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";
@Schema()
export class PlanTrip {
    @Prop()
    @Transform(({ value }) => value.toString())
    id: MongooseSchema.Types.ObjectId

    @ApiProperty()
    @Prop({required: true})
    tripName: string

    @ApiProperty({type: Date})
    @Prop({type: Date})
    goneDate: Date

    @ApiProperty({type: Date})
    @Prop({type: Date})
    returnDate: Date

    @ApiProperty({type: Coordinate})
    @Prop({required: true, type: Coordinate})
    coordinate: Coordinate

    @ApiProperty({type: Number})
    @Prop()
    distance: number

    @ApiProperty({type: [PlannedLocation]})
    @Prop([{ type: PlannedLocation }])
    plannedLocation: Object;
    
    @ApiProperty({type: MongooseSchema.Types.ObjectId})
    @Prop([{ type: MongooseSchema.Types.ObjectId, ref: LocationCategory.name }])
    @Type(() => LocationCategory)
    avoidCategory: LocationCategory

    @ApiProperty({type: MongooseSchema.Types.ObjectId})
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name })
    @Type(() => User)
    uid: User

    @Prop()
    cdate: Date
}

export type PlanTripDocument = PlanTrip & Document;
export const PlanTripSchema = SchemaFactory.createForClass(PlanTrip);