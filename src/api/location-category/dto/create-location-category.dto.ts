import { ApiProperty } from "@nestjs/swagger";
import { isInt, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateLocationCategoryDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

}
