import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { IsLongitude } from "class-validator";

export class Geometry {
  @ApiProperty({ type: String })
  @Prop({ type: String })
  type: String

  @ApiProperty({ type: [Number] })
  @Prop({ type: [Number] })
  coordinates: number[]

}

export type GeometryDocument = Geometry & Document;
export const GeometrySchema = SchemaFactory.createForClass(Geometry);