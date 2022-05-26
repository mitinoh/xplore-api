

import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsMongoId, IsNotEmpty, IsString } from "class-validator";
import { Document, Schema as MongooseSchema, Types } from "mongoose";

export class CreateNewLocationDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    desc: string = "";

    @ApiProperty()
    @IsString()
    indication: string = "";

    @ApiProperty({type: [MongooseSchema.Types.ObjectId]})
    @IsArray()
    @IsMongoId({each: true})
    locationCategory: MongooseSchema.Types.ObjectId[] = []

    cdate: number = Date.now();

}
