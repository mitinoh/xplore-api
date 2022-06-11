import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UsePipes, ValidationPipe, Put } from '@nestjs/common';
import { RateLocationService } from './rate-location.service';
import { CreateRateLocationDto } from './dto/create-rate-location.dto';
import { UpdateRateLocationDto } from './dto/update-rate-location.dto';
import { Http2ServerRequest } from 'http2';
import { MongoQuery, MongoQueryModel } from 'nest-mongo-query-parser';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('rate-location')
@Controller('rate-location')
export class RateLocationController {
  constructor(private readonly rateLocationService: RateLocationService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Req() req: Http2ServerRequest, @Body() createRateLocationDto: CreateRateLocationDto) {
    return this.rateLocationService.create(req, createRateLocationDto);
  }


  @ApiQuery({ name: 'uid', type: 'objectId', required: false })
  @ApiQuery({ name: 'location', type: 'objectId', required: false })
  @Get()
  findAll(@Req() req: Http2ServerRequest, @MongoQuery() query: MongoQueryModel) {
    return this.rateLocationService.findAll(req, query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rateLocationService.findOne(id);
  }

  @Patch(':id')
  @ApiBody({
    type: CreateRateLocationDto
  })
  update(@Param('id') id: string, @Body() updateRateLocationDto: UpdateRateLocationDto) {
    return this.rateLocationService.update(id, updateRateLocationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rateLocationService.remove(id);
  }
}
