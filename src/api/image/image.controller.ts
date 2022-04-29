import { Controller, Post, Body, Param } from '@nestjs/common';
import { ImageService } from './image.service';
import { CreateImageDto } from './dto/create-image.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('image')
@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post(':id')
  @ApiOperation({
    summary: 'Store image ', 
    description:'Save image in jpg format passing "base64" and image entity'
  })
  create(@Param('id') id: string, @Body() createImageDto: CreateImageDto) {
    return this.imageService.create(id, createImageDto);
  }

}
