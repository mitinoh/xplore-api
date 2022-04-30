import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { EntityRule } from "../validator/entity.validator";
import { ImageEntity } from "../entities/image-entity.enum";
export class CreateImageDto {
    @ApiProperty()
    @IsNotEmpty()
    base64: string;

    @ApiProperty({enum: ImageEntity})
    @IsNotEmpty()
    entity: string;
}
