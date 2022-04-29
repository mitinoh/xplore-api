import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, ValidateIf } from "class-validator";
import { Document, Schema as MongooseSchema, Types } from "mongoose";

export class DayAvaiable {
   
    //@ValidateIf(el =>  el >= 0 && el < 7) 
    @ApiProperty({type: Number})
    @IsNotEmpty()
    @Prop({type: Number})
    @IsNumber()
    day: number

   // @ValidateIf(el =>  el >= 0 && el <= 24) 
    @ApiProperty({type: Number})
    @IsNotEmpty()
    @Prop({type: Number})
    @IsNumber()
    start: number

    //@ValidateIf(el =>  el >= 0 && el <= 24) 
    @ApiProperty({type: Number})
    @IsNotEmpty()
    @Prop({type: Number})
    @IsNumber()
    end: number
}

export type DayAvaiableDocument = DayAvaiable & Document;
export const DayAvaiableSchema = SchemaFactory.createForClass(DayAvaiable);