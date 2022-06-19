import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsEmpty, IsIn, IsInt, IsMongoId, IsNotEmpty, IsNotEmptyObject, IsNumber, IsObject, IsString, NotEquals, notEquals, Validate, ValidateIf, ValidateNested } from "class-validator";
import { DayAvaiable } from "../entities/dayavaiable.interface";
import { CoordinateRule, CoordinateValidator } from "../validator/location.validator";
import { Document, Schema as MongooseSchema, Types } from "mongoose";
import { Geometry} from "../entities/geometry.interface";
import { Prop} from "@nestjs/mongoose";

export class CreateLocationDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    desc: string = "";

    @ApiProperty()
    @IsString()
    indication: string = "";

    @ApiProperty({type: [DayAvaiable]})
    @ValidateNested({each: true})
    dayAvaiable: DayAvaiable[] 

    //  @ValidateIf(el =>  el >= 0 && el < 5) // TODO: Creare validatore 
    @ApiProperty({type: [Number]})
    @IsNumber({},{each: true})
    periodAvaiable: number[] = []

    @ApiProperty({type: [MongooseSchema.Types.ObjectId]})
    @IsArray()
    @IsMongoId({each: true})
    locationCategory: MongooseSchema.Types.ObjectId[] = []

    
    @ApiProperty({ type: Geometry })
    @Prop({ type: Geometry , index: "2dsphere"})
    @Type(() => Geometry)
    geometry: Geometry
    

    cdate: number = Date.now();

}
