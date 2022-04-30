import { ApiProperty } from "@nestjs/swagger";
import { isInt, IsMongoId, IsNotEmpty, IsNumber, ValidateIf } from "class-validator";
import { Document, Schema as MongooseSchema, Types } from "mongoose";

export class CreateRateLocationDto {

    @ApiProperty({type: MongooseSchema.Types.ObjectId})
    @IsNotEmpty()
    @IsMongoId()
    location: MongooseSchema.Types.ObjectId

    // TODO: Creare validatore 
    @ApiProperty({type: Number})
    @IsNotEmpty()
    @IsNumber()
    rate: number;

    cdate: number = Date.now();

}
