
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber } from "class-validator";
import { Document, Schema as MongooseSchema, Types } from "mongoose";
import { LocationCategory } from "src/api/location-category/entities/location-category.entity";
import { Coordinate } from "src/api/location/entities/coordinate.interface";
import { DayAvaiable } from "src/api/location/entities/dayavaiable.interface";
import { CoordinateRule } from "src/api/location/validator/location.validator";
import { PlannedLocation } from "../entities/planned-location.interface";
import { Location } from "src/api/location/entities/location.entity";
import { PlannedLocationInfo } from "../entities/planned-location-info.interface";
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
    plannedLocation: PlannedLocation[]
/*
    @ApiProperty()
    @IsArray()
    plannedLocationInfo: PlannedLocationInfo[]
    
    */
    @ApiProperty()
    @IsArray()
    avoidCategory: LocationCategory[]


    @ApiProperty()
    cdate: number = Date.now();

}
