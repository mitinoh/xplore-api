import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { Document, Schema as MongooseSchema } from "mongoose";
import { LocationCategory } from "src/api/location-category/entities/location-category.entity";
import { User } from "src/api/user/entities/user.entity";
import { Coordinate } from "./coordinate.interface";
import { DayAvaiable } from "./dayavaiable.interface";


@Schema({ /* timestamps: true , collection: "EVENTS_COLLECTION" */ })
export class Location {


    /*
    @Prop(() => MongooseSchema.Types.ObjectId)
    mdbId: MongooseSchema.Types.ObjectId
    */
    @ApiProperty({ type: MongooseSchema.Types.ObjectId })
    @Prop(() => MongooseSchema.Types.ObjectId)
    @Transform(({ value }) => value.toString())
    id: MongooseSchema.Types.ObjectId

    @ApiProperty({ type: String })
    @Prop({ required: true })
    name: string

    @ApiProperty({ type: String })
    @Prop()
    desc: string

    @ApiProperty({ type: String })
    @Prop()
    indication: string

    @ApiProperty({ type: Coordinate })
    @Prop({ required: true, type: Coordinate })
    coordinate: Coordinate

    @ApiProperty({ type: Number })
    @Prop()
    periodAvaiable: number[]

    @ApiProperty({ type: [DayAvaiable] })
    @ValidateNested({ each: true })
    @Type(() => DayAvaiable)
    @Prop()
    dayAvaiable: DayAvaiable[]

    @ApiProperty({ type: [MongooseSchema.Types.ObjectId] })
    @Prop([{ type: MongooseSchema.Types.ObjectId, ref: LocationCategory.name }])
    @Type(() => LocationCategory)
    locationCategory: LocationCategory[]


    @ApiProperty({ type: Boolean })
    @Prop()
    saved: boolean

    @ApiProperty({ type: User })
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name })
    @Type(() => User)
    insertUid: User

    @Prop({ type: Date })
    cdate: Date
}

export type LocationDocument = Location & Document;
export const LocationSchema = SchemaFactory.createForClass(Location);