import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UsePipes, ValidationPipe, Put } from '@nestjs/common';
import { LocationCategoryService } from './location-category.service';
import { CreateLocationCategoryDto } from './dto/create-location-category.dto';
import { UpdateLocationCategoryDto } from './dto/update-location-category.dto';
import { Http2ServerRequest } from 'http2';
import { MongoQuery, MongoQueryModel } from 'nest-mongo-query-parser';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('location-category')
@Controller('location-category')
export class LocationCategoryController {
  constructor(private readonly locationCategoryService: LocationCategoryService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Req() req: Http2ServerRequest, @Body() createLocationCategoryDto: CreateLocationCategoryDto) {
    return this.locationCategoryService.create(req, createLocationCategoryDto);
  }

  @Get()
  findAll( @MongoQuery() query: MongoQueryModel) {
    return this.locationCategoryService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.locationCategoryService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLocationCategoryDto: UpdateLocationCategoryDto) {
    return this.locationCategoryService.update(id, updateLocationCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.locationCategoryService.remove(id);
  }
}
