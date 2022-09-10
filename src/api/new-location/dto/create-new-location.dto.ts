

import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBase64, IsMongoId, IsNotEmpty, IsString } from "class-validator";
import { Schema as MongooseSchema } from "mongoose";

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

    @ApiProperty()
    @IsString()
    address: string = "";

    @ApiProperty({ type: [MongooseSchema.Types.ObjectId] })
    @IsArray()
    locationCategory: MongooseSchema.Types.ObjectId[] = []


    @ApiProperty()
    base64: string;

    cdate: number = Date.now();

}
