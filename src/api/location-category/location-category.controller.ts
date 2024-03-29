import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UsePipes, ValidationPipe, Put, Query } from '@nestjs/common';
import { LocationCategoryService } from './location-category.service';
import { CreateLocationCategoryDto } from './dto/create-location-category.dto';
import { UpdateLocationCategoryDto } from './dto/update-location-category.dto';
import { Http2ServerRequest } from 'http2';
import { MongoQuery, MongoQueryModel } from 'nest-mongo-query-parser';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('location-category')
@Controller('location-category')
export class LocationCategoryController {
  constructor(private readonly locationCategoryService: LocationCategoryService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Req() req: Http2ServerRequest, @Body() createLocationCategoryDto: CreateLocationCategoryDto) {
    return this.locationCategoryService.create(req, createLocationCategoryDto);
  }


  @ApiQuery({ name: 'name', type: 'string', required: false })
  @Get()
  findAll( @Query() query: any) {
    return this.locationCategoryService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.locationCategoryService.findOne(id);
  }

  @Patch(':id')
  @ApiBody({
    type: CreateLocationCategoryDto
  })
  update(@Param('id') id: string, @Body() updateLocationCategoryDto: UpdateLocationCategoryDto) {
    return this.locationCategoryService.update(id, updateLocationCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.locationCategoryService.remove(id);
  }
}
