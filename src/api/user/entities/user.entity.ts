
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { Document, Schema as MongooseSchema } from "mongoose";

var uniqueValidator = require('mongoose-unique-validator');

@Schema({ toJSON: { virtuals: true, getters: true }, toObject: { virtuals: true, getters: true } })
export class User {
    @ApiProperty({ type: MongooseSchema.Types.ObjectId })
    @Prop(() => MongooseSchema.Types.ObjectId)
    @Transform(({ value }) => value.toString())
    id: MongooseSchema.Types.ObjectId

    @ApiProperty({ type: String })
    @Prop({ required: true, unique: true })
    username: string

    @ApiProperty({ type: String })
    @Prop()
    bio: string

    @ApiProperty({ type: String })
    @Prop({ required: true })
    fid: string

    @Prop({ type: Date })
    cdate: Date

    
}

export type UserDocument = User & Document;
const UserSchema = SchemaFactory.createForClass(User);
UserSchema.plugin(uniqueValidator,{ message: '{PATH} must be unique' });

UserSchema.virtual('following', {
    ref: 'Follower',                // fetch from User model
    localField: '_id',
    foreignField: 'followed'
})
export { UserSchema }
