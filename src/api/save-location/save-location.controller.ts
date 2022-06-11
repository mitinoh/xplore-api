import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { SaveLocationService } from './save-location.service';
import { CreateSaveLocationDto } from './dto/create-save-location.dto';
import { UpdateSaveLocationDto } from './dto/update-save-location.dto';
import { MongoQuery, MongoQueryModel } from 'nest-mongo-query-parser';
import { Http2ServerRequest } from 'http2';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('save-location')
@Controller('save-location')
export class SaveLocationController {
  constructor(private readonly saveLocationService: SaveLocationService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Req() req: Http2ServerRequest, @Body() createSaveLocationDto: CreateSaveLocationDto) {
    return this.saveLocationService.create(req, createSaveLocationDto);
  }

  @ApiQuery({ name: 'uid', type: 'objecId', required: false })
  @ApiQuery({ name: 'location', type: 'objectId', required: false })
  @Get()
  findAll(@Req() req: Http2ServerRequest, @MongoQuery() query: MongoQueryModel) {
    return this.saveLocationService.findAll(req, query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saveLocationService.findOne(id);
  }
/*
  @Patch(':id')
  @ApiBody({
    type: CreateSaveLocationDto
  })
  update(@Param('id') id: string, @Body() updateSaveLocationDto: UpdateSaveLocationDto) {
    return this.saveLocationService.update(id, updateSaveLocationDto);
  }

  */
  @Delete(':id')
  remove(@Req() req: Http2ServerRequest, @Param('id') id: string) {
    return this.saveLocationService.remove(req, id);
  }
}
