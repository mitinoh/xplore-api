
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Document, Schema as MongooseSchema, Types } from "mongoose";
export class CreateSaveLocationDto {

    @ApiProperty()
    @IsNotEmpty()
    location: MongooseSchema.Types.ObjectId

    @ApiProperty()
    cdate: number = Date.now();
}
