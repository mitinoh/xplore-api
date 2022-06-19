
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Document, Schema as MongooseSchema, Types } from "mongoose";
import { LocationCategory } from "src/api/location-category/entities/location-category.entity";
import { DayAvaiable } from "src/api/location/entities/dayavaiable.interface";
import { CoordinateRule } from "src/api/location/validator/location.validator";
import { PlannedLocation } from "../entities/planned-location.interface";
import { Location } from "src/api/location/entities/location.entity";
import { Geometry } from "src/api/location/entities/geometry.interface";
import { Prop } from "@nestjs/mongoose";
import { Type } from "class-transformer";
export class CreatePlanTripDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    tripName: string;

    @ApiProperty({type: Date})
    @IsNotEmpty()
    goneDate: Date;

    @ApiProperty({type: Date})
    @IsNotEmpty()
    returnDate: Date;

    @ApiProperty({type: Number})
    @IsNumber()
    distance: number;

    @ApiProperty({type: [PlannedLocation]})
    @IsArray()
    plannedLocation: PlannedLocation[]

    @ApiProperty({type: [PlannedLocation]})
    @IsArray()
    avoidCategory: LocationCategory[]

    @ApiProperty({ type: Geometry })
    @Prop({ type: Geometry , index: "2dsphere"})
    @Type(() => Geometry)
    geometry: Geometry
    
    cdate: number = Date.now();

}
