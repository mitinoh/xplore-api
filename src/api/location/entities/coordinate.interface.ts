import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsLatitude, IsLongitude } from "class-validator";

export interface Coordinate {
    lat: number;
    lng: number;
    alt: number;
}

export class Coordinate {
    @Prop()
    @IsLatitude() // 6 cifre richieste
    lat: number
    @Prop()
    @IsLongitude()
    lng: number
    @Prop()
    @IsLongitude()
    alt: number
}

export type CoordinateDocument = Coordinate & Document;
export const CoordinateSchema = SchemaFactory.createForClass(Coordinate);