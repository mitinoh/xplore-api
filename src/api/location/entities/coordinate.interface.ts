import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsLatitude, IsLongitude } from "class-validator";

export class Coordinate {
    @ApiProperty({type: Number})
    @IsLatitude() // 6 cifre richieste
    @Prop({type: Number})
    lat: number

    @ApiProperty({type: Number})
    @IsLongitude()
    @Prop({type: Number})
    lng: number

    @ApiProperty({type: Number})
    @IsLongitude()
    @Prop({type: Number})
    alt: number
}

export type CoordinateDocument = Coordinate & Document;
export const CoordinateSchema = SchemaFactory.createForClass(Coordinate);