import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Coordinate } from "./coordinate.interface";
import { DayAvaiable } from "./dayavaiable.interface";
import { LocationCategory, LocationCategorySchema } from "src/api/location-category/entities/location-category.entity";
import { Transform, Type } from "class-transformer";
import { Document, Schema as MongooseSchema, Types } from "mongoose";


@Schema({ /* timestamps: true , collection: "EVENTS_COLLECTION" */ })
export class Location {
    @Prop()
    @Transform(({ value }) => value.toString())
    id: MongooseSchema.Types.ObjectId

    @Prop({required: true})
    name: string

    @Prop()
    desc: string

    @Prop({required: true,type: Coordinate})
    coordinate: Coordinate

    @Prop()
    periodAvaiable: number[]

    @Prop({type: DayAvaiable})
    dayAvaiable: DayAvaiable[]

    @Prop([{ type: MongooseSchema.Types.ObjectId, ref: LocationCategory.name }])
    @Type(() => LocationCategory)
    locationcategory: LocationCategory[]
    
    @Prop()
    cdate: Date
}

export type LocationDocument = Location & Document;
export const LocationSchema = SchemaFactory.createForClass(Location);