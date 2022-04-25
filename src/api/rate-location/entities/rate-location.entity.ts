
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Transform, Type } from "class-transformer";
import { Document, Schema as MongooseSchema, Types } from "mongoose";
import { User } from "src/api/user/entities/user.entity";
import { Location } from "src/api/location/entities/location.entity";

@Schema()
export class RateLocation {
    @Prop()
    @Transform(({ value }) => value.toString())
    id: MongooseSchema.Types.ObjectId

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name })
    @Type(() => User)
    uid: User

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: Location.name })
    @Type(() => Location)
    location: Location

    @Prop({ type:MongooseSchema.Types.Decimal128 })
    rate: number

    @Prop()
    cdate: Date
}

export type RateLocationDocument = RateLocation & Document;
export const RateLocationSchema = SchemaFactory.createForClass(RateLocation);