import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, ValidateIf } from "class-validator";
import { Document, Schema as MongooseSchema, Types } from "mongoose";

export class DayAvaiable {
    @IsNumber()
    //@ValidateIf(el =>  el >= 0 && el < 7) 
    @ApiProperty({type: Number})
    @Prop({type: Number})
    @Type(() => Number)
    day: number


    
   // @ValidateIf(el =>  el >= 0 && el <= 24) 
    @ApiProperty({type: Number})
    @Prop({ type:MongooseSchema.Types.Decimal128 })
    @Type(() => Number)

    
    start: number
    //@ValidateIf(el =>  el >= 0 && el <= 24) 
    @ApiProperty({type: Number})
    @Prop({ type:MongooseSchema.Types.Decimal128 })
    @Type(() => Number)
    @IsNumber()
    end: number
}

export type DayAvaiableDocument = DayAvaiable & Document;
export const DayAvaiableSchema = SchemaFactory.createForClass(DayAvaiable);