
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber } from "class-validator";
import { Document, Schema as MongooseSchema, Types } from "mongoose";
import { LocationCategory } from "src/api/location-category/entities/location-category.entity";
import { Coordinate } from "src/api/location/entities/coordinate.interface";
import { DayAvaiable } from "src/api/location/entities/dayavaiable.interface";
import { CoordinateRule } from "src/api/location/validator/location.validator";
import { PlannedTrip } from "../entities/planned-trip.interface";
export class CreatePlanTripDto {

    @ApiProperty()
    @IsNotEmpty()
    tripName: string;

    @ApiProperty()
    @IsNotEmpty()
    goneDate: Date;

    @ApiProperty()
    @IsNotEmpty()
    returnDate: Date;

    @ApiProperty()
    @CoordinateRule()
    coordinate: Coordinate;

    @ApiProperty()
    @IsNumber()
    distance: number;

    @ApiProperty()
    @IsArray()
    plannedTrip: PlannedTrip[]

    @ApiProperty()
    @IsArray()
    avoidCategory: LocationCategory[]


    @ApiProperty()
    cdate: number = Date.now();

}
