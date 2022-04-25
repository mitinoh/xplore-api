import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber } from "class-validator";
import { CoordinateRule } from "src/api/location/validator/location.validator";
import { Document, Schema as MongooseSchema, Types } from "mongoose";

export class CreateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    categoryPreferences: MongooseSchema.Types.ObjectId[] = []

    @ApiProperty()
    cdate: number = Date.now();

}
