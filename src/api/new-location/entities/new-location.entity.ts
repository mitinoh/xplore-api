import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";
import { Document, Schema as MongooseSchema } from "mongoose";
import { LocationCategory } from "src/api/location-category/entities/location-category.entity";
import { User } from "src/api/user/entities/user.entity";

@Schema()
export class NewLocation {
    @ApiProperty({ type: MongooseSchema.Types.ObjectId })
    @Prop({ type: MongooseSchema.Types.ObjectId })
    @Transform(({ value }) => value.toString())
    id: MongooseSchema.Types.ObjectId

    @ApiProperty({ type: String })
    @Prop({ type: String, required: true })
    @IsNotEmpty()
    @IsString()
    name: string

    @ApiProperty({ type: String })
    @Prop({ type: String })
    @IsString()
    desc: string

    @ApiProperty({ type: String })
    @Prop({ type: String })
    @IsString()
    address: string


    @ApiProperty({ type: String })
    @Prop({ type: String })
    @IsString()
    indication: string

    @ApiProperty({ type: MongooseSchema.Types.ObjectId })
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name })
    @Type(() => User)
    uid: User

    @ApiProperty({ type: [MongooseSchema.Types.ObjectId] })
    @Prop([{ type: MongooseSchema.Types.ObjectId, ref: LocationCategory.name }])
    @Type(() => LocationCategory)
    locationCategory: LocationCategory

    /*
        @ApiProperty({ type: String })
        @Prop({ type: String })
        @IsString()
        base64: string
        */


    @Prop({ type: Date })
    cdate: Date



}

export type NewLocationDocument = NewLocation & Document;
export const NewLocationSchema = SchemaFactory.createForClass(NewLocation);