
import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty, IsObject } from "class-validator";
import { Document, Schema as MongooseSchema, Types } from "mongoose";
import { ObjectId } from 'bson';
export class CreateSaveLocationDto {

    @ApiProperty({type: ObjectId})
    @IsNotEmpty()
    @IsMongoId()
    location: ObjectId

    cdate: Date = new Date();
}
