import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Transform } from "class-transformer";

import { Document, Schema as MongooseSchema, Types } from "mongoose";

@Schema()
export class LocationCategory {
    @Transform(({ value }) => value.toString())
    id: MongooseSchema.Types.ObjectId

    @Prop()
    name: string

    @Prop()
    cdate: Date
}

export type LocationCategoryDocument = LocationCategory & Document;
export const LocationCategorySchema = SchemaFactory.createForClass(LocationCategory);