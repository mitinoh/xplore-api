import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsMongoId, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { CoordinateRule } from "src/api/location/validator/location.validator";
import { Document, Schema as MongooseSchema, Types } from "mongoose";

export class CreateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    bio: string;

    @ApiProperty({type: [MongooseSchema.Types.ObjectId]})
    @IsArray()
    @IsMongoId({each: true})
    categoryPreferences: MongooseSchema.Types.ObjectId[] = []

    cdate: number = Date.now();

}
