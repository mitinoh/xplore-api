import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { PlanTripService } from './plan-trip.service';
import { CreatePlanTripDto } from './dto/create-plan-trip.dto';
import { UpdatePlanTripDto } from './dto/update-plan-trip.dto';
import { Http2ServerRequest } from 'http2';
import { MongoQuery, MongoQueryModel } from 'nest-mongo-query-parser';

@Controller('api/plan-trip')
export class PlanTripController {
  constructor(private readonly planTripService: PlanTripService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Req() req:Http2ServerRequest, @Body() createPlanTripDto: CreatePlanTripDto) {
    return this.planTripService.create(req, createPlanTripDto);
  }

  @Get()
  findAll( @MongoQuery() query: MongoQueryModel) {
    return this.planTripService.findAll( query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.planTripService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlanTripDto: UpdatePlanTripDto) {
    return this.planTripService.update(id, updatePlanTripDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.planTripService.remove(id);
  }
}
