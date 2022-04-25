import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Transform, Type } from "class-transformer"
import { Document, Schema as MongooseSchema, Types } from "mongoose";
import { LocationCategory } from "src/api/location-category/entities/location-category.entity";
import { User } from "src/api/user/entities/user.entity";

@Schema()
export class NewLocation {
    @Prop()
    @Transform(({ value }) => value.toString())
    id: MongooseSchema.Types.ObjectId

    @Prop({required: true})
    name: string

    @Prop()
    desc: string

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name })
    @Type(() => User)
    uid: User

    @Prop([{ type: MongooseSchema.Types.ObjectId, ref: LocationCategory.name }])
    @Type(() => LocationCategory)
    locationcategory: LocationCategory

    @Prop()
    cdate: Date
}

export type NewLocationDocument = NewLocation & Document;
export const NewLocationSchema = SchemaFactory.createForClass(NewLocation);