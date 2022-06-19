import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { PlanTripService } from './plan-trip.service';
import { CreatePlanTripDto } from './dto/create-plan-trip.dto';
import { UpdatePlanTripDto } from './dto/update-plan-trip.dto';
import { Http2ServerRequest } from 'http2';
import { MongoQuery, MongoQueryModel } from 'nest-mongo-query-parser';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('plan-trip')
@Controller('plan-trip')
export class PlanTripController {
  constructor(private readonly planTripService: PlanTripService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Req() req:Http2ServerRequest, @Body() createPlanTripDto: CreatePlanTripDto) {
    return this.planTripService.create(req, createPlanTripDto);
  }


  @ApiQuery({ name: 'tripName', type: 'string', required: false })
  @ApiQuery({ name: 'goneDate', type: 'date', required: false })
  @ApiQuery({ name: 'returnDate', type: 'date', required: false })
  @ApiQuery({ name: 'uid', type: 'objectId', required: false })
  @ApiQuery({ name: 'cdate', type: 'date', required: false })
  @Get()
  findAll(@Req() req: Http2ServerRequest, @Query() query: any) {
    return this.planTripService.findAll(req, query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.planTripService.findOne(id);
  }

  @Patch(':id')
  @ApiBody({
    type: CreatePlanTripDto
  })
  update(@Param('id') id: string, @Body() updatePlanTripDto: UpdatePlanTripDto) {
    return this.planTripService.update(id, updatePlanTripDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.planTripService.remove(id);
  }
}
