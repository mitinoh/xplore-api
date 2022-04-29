import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsEmpty, IsIn, IsInt, IsNotEmpty, IsNotEmptyObject, IsNumber, IsObject, NotEquals, notEquals, Validate, ValidateIf, ValidateNested } from "class-validator";
import { Coordinate } from "../entities/coordinate.interface";
import { DayAvaiable } from "../entities/dayavaiable.interface";
import { CoordinateRule, CoordinateValidator } from "../validator/location.validator";
import { Document, Schema as MongooseSchema, Types } from "mongoose";
import { DayAvaiableRule } from "../validator/day-avaiable.validator";
import { Prop } from "@nestjs/mongoose";

export class CreateLocationDto {

    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    desc: string = "";

    @ApiProperty()
    @CoordinateRule()
    coordinate: Coordinate;

    @ApiProperty()
    @ValidateNested()
    @Type(() => DayAvaiable)
    @IsObject()
    dayAvaiable: DayAvaiable[] 

    @ValidateIf(el =>  el >= 0 && el < 5) 
    @ApiProperty()
    @IsNumber({},{each: true})
    periodAvaiable: number[] = []

    @ApiProperty()
    locationcategory: MongooseSchema.Types.ObjectId[] = []

    cdate: number = Date.now();

}
