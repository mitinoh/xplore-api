
import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty, IsObject } from "class-validator";
import { Document, Schema as MongooseSchema, Types } from "mongoose";
export class CreateSaveLocationDto {

    @ApiProperty({type: MongooseSchema.Types.ObjectId})
    @IsNotEmpty()
    @IsMongoId()
    location: MongooseSchema.Types.ObjectId

    cdate: number = Date.now();
}
