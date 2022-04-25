import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsEmpty, IsIn, IsInt, IsNotEmpty, IsNumber, NotEquals, notEquals, Validate, ValidateIf } from "class-validator";
import { Coordinate } from "../entities/coordinate.interface";
import { DayAvaiable } from "../entities/dayavaiable.interface";
import { CoordinateRule, CoordinateValidator } from "../validator/location.validator";
import { Document, Schema as MongooseSchema, Types } from "mongoose";
import { DayAvaiableRule } from "../validator/day-avaiable.validator";

export class CreateLocationDto {

    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    desc: string = "";

    @ApiProperty()
    @CoordinateRule()
    coordinate: Coordinate;

    @DayAvaiableRule()
    @ApiProperty()
    @IsArray()
    dayAvaiable: DayAvaiable[] = []

    @ValidateIf(el =>  el >= 0 && el < 5) 
    @ApiProperty()
    @IsNumber({},{each: true})
    periodAvaiable: number[] = []

    @ApiProperty()
    locationcategory: MongooseSchema.Types.ObjectId[] = []

    @ApiProperty()
    cdate: number = Date.now();

}
