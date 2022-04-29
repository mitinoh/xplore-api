import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { EntityRule } from "../validator/entity.validator";

export class CreateImageDto {
    @ApiProperty()
    @IsNotEmpty()
    base64: string;

    @ApiProperty()
    @IsNotEmpty()
    @EntityRule()
    entity: string;
}
