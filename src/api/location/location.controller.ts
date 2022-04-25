import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ValidationPipe,UsePipes, Res, Req, HttpException, HttpStatus, Logger, Inject } from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { MongoQuery, MongoQueryModel } from 'nest-mongo-query-parser';
import { Http2ServerRequest, Http2ServerResponse } from 'http2';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { AppService } from 'src/app.service';

@Controller('api/location')
export class LocationController {
  constructor(
    private readonly locationService: LocationService,
    @Inject('winston')  private readonly logger: Logger,
    ) {}

  
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Req() req: Http2ServerRequest, @Body() createLocationDto: CreateLocationDto) {
    return this.locationService.create(req, createLocationDto);
  }

  @Get()
  findAll(@MongoQuery() query: MongoQueryModel) {
    return this.locationService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.locationService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateLocationDto: UpdateLocationDto) {
    return this.locationService.update(id, updateLocationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.logger.error("Forbidden")
    throw new HttpException("Forbidden", HttpStatus.FORBIDDEN);
    return this.locationService.remove(id);
  }
}
