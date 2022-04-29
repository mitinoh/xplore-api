import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { SaveLocationService } from './save-location.service';
import { CreateSaveLocationDto } from './dto/create-save-location.dto';
import { UpdateSaveLocationDto } from './dto/update-save-location.dto';
import { MongoQuery, MongoQueryModel } from 'nest-mongo-query-parser';
import { Http2ServerRequest } from 'http2';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('save-location')
@Controller('save-location')
export class SaveLocationController {
  constructor(private readonly saveLocationService: SaveLocationService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Req() req: Http2ServerRequest, @Body() createSaveLocationDto: CreateSaveLocationDto) {
    return this.saveLocationService.create(req, createSaveLocationDto);
  }

  @Get()
  findAll(@MongoQuery() query: MongoQueryModel) {
    return this.saveLocationService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saveLocationService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSaveLocationDto: UpdateSaveLocationDto) {
    return this.saveLocationService.update(id, updateSaveLocationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.saveLocationService.remove(id);
  }
}
