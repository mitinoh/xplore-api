import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { Document, Schema as MongooseSchema } from "mongoose";
import { LocationCategory } from "src/api/location-category/entities/location-category.entity";
import { User } from "src/api/user/entities/user.entity";
import { DayAvaiable } from "./dayavaiable.interface";
import { Geometry } from "./geometry.interface";


@Schema({ /* timestamps: true , collection: "EVENTS_COLLECTION" */  toJSON: { virtuals: true, getters: true }, toObject: { virtuals: true, getters: true } })

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
/*
    @ApiProperty({ type: Coordinate })
    @Prop({ required: true, type: Coordinate })
    coordinate: Coordinate
    */

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

    @ApiProperty({ type: Geometry })
    @Prop({ type: Geometry , index: "2dsphere"})
    @Type(() => Geometry)
    geometry: Geometry


    @Prop({ type: Date })
    cdate: Date
}



export type LocationDocument = Location & Document;
const LocationSchema = SchemaFactory.createForClass(Location);



LocationSchema.virtual('savedList', {
    ref: 'SaveLocation',                // fetch from User model
    localField: '_id',
    foreignField: 'location'
})

LocationSchema.index({ geometry: '2dsphere' });

export { LocationSchema };
