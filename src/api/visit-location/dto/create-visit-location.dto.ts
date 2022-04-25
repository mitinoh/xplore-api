import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Document, Schema as MongooseSchema, Types } from "mongoose";

export class CreateVisitLocationDto {
    @ApiProperty()
    location: MongooseSchema.Types.ObjectId

    @ApiProperty()
    cdate: number = Date.now();
}
