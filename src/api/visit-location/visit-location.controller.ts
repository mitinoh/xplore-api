import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UsePipes, ValidationPipe, HttpException, HttpStatus, Logger, Inject } from '@nestjs/common';
import { VisitLocationService } from './visit-location.service';
import { CreateVisitLocationDto } from './dto/create-visit-location.dto';
import { UpdateVisitLocationDto } from './dto/update-visit-location.dto';

import { Http2ServerRequest } from 'http2';
import { MongoQuery, MongoQueryModel } from 'nest-mongo-query-parser';


@Controller('visit-location')
export class VisitLocationController {
  constructor(
    private readonly visitLocationService: VisitLocationService,
    @Inject('winston')  private readonly logger: Logger,) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Req() req: Http2ServerRequest, @Body() createVisitLocationDto: CreateVisitLocationDto) {
    return this.visitLocationService.create(req, createVisitLocationDto);
  }

  @Get()
  findAll(@MongoQuery() query: MongoQueryModel) {
    return this.visitLocationService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.visitLocationService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVisitLocationDto: UpdateVisitLocationDto) {
    return this.visitLocationService.update(id, updateVisitLocationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.logger.error("Forbidden")
    throw new HttpException("Forbidden", HttpStatus.FORBIDDEN);
    return this.visitLocationService.remove(id);
  }
}
