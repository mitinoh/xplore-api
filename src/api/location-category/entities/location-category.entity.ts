import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

import { Document, Schema as MongooseSchema, Types } from "mongoose";

@Schema()
export class LocationCategory {

    @ApiProperty({type: [MongooseSchema.Types.ObjectId]})
    @Transform(({ value }) => value.toString())
    id: MongooseSchema.Types.ObjectId


    @ApiProperty({type: String})
    @Prop({type: String})
    @IsNotEmpty()
    @IsString()
    name: string

    @ApiProperty({type: Date})
    @Prop({type: Date})
    cdate: Date
}

export type LocationCategoryDocument = LocationCategory & Document;
export const LocationCategorySchema = SchemaFactory.createForClass(LocationCategory);