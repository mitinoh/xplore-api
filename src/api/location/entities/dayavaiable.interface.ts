import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document, Schema as MongooseSchema, Types } from "mongoose";

export interface DayAvaiable {
    day: number;
    start: number;
    end: number;
}

export class DayAvaiable {
    @Prop()
    day: number
    @Prop({ type:MongooseSchema.Types.Decimal128 })
    start: number
    @Prop({ type:MongooseSchema.Types.Decimal128 })
    end: number
}

export type DayAvaiableDocument = DayAvaiable & Document;
export const DayAvaiableSchema = SchemaFactory.createForClass(DayAvaiable);