

import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Document, Schema as MongooseSchema, Types } from "mongoose";

export class CreateNewLocationDto {

    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    desc: string = "";

    @ApiProperty()
    locationcategory: MongooseSchema.Types.ObjectId[] = []


    @ApiProperty()
    cdate: number = Date.now();

}
