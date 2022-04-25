import { ApiProperty } from "@nestjs/swagger";
import { isInt, IsNotEmpty, ValidateIf } from "class-validator";
import { Document, Schema as MongooseSchema, Types } from "mongoose";

export class CreateRateLocationDto {

    @ApiProperty()
    @IsNotEmpty()
    location: MongooseSchema.Types.ObjectId

    @ApiProperty()
    @IsNotEmpty()
    @ValidateIf(el =>  el >= 0 && el <= 5) 
    rate: number;

    @ApiProperty()
    cdate: number = Date.now();

}
