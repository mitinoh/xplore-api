import { Body, Controller, Get, Inject, Logger, Param, Patch, Post, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Http2ServerRequest } from 'http2';
import { MongoQuery, MongoQueryModel } from 'nest-mongo-query-parser';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { LocationService } from './location.service';

@ApiTags('location')
@Controller('location')
export class LocationController {
  constructor(
    private readonly locationService: LocationService,
    @Inject('winston') private readonly logger: Logger,
  ) { }


  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Req() req: Http2ServerRequest, @Body() createLocationDto: CreateLocationDto) {
    return this.locationService.create(req, createLocationDto);
  }

  @ApiQuery({ name: 'name', type: 'string', required: false })
  @ApiQuery({ name: 'desc', type: 'string', required: false })
  @ApiQuery({ name: 'indication', type: 'string', required: false })
  @ApiQuery({ name: 'coordinate.lat', type: 'number', required: false })
  @ApiQuery({ name: 'coordinate.lbg', type: 'number', required: false })
  @ApiQuery({ name: 'coordinate.alt', type: 'number', required: false })
  @ApiQuery({ name: 'periodAvaiable', type: 'number', required: false })
  @ApiQuery({ name: 'dayAvaiable.day', type: 'number', required: false })
  @ApiQuery({ name: 'dayAvaiable.start', type: 'number', required: false })
  @ApiQuery({ name: 'dayAvaiable.end', type: 'number', required: false })
  @ApiQuery({ name: 'locationCategory', type: 'objectId', required: false })
  @ApiQuery({ name: 'cdate', type: 'date', required: false })
  @Get()
  findAll(@Req() req: Http2ServerRequest, @MongoQuery() query: MongoQueryModel) {
    return this.locationService.findAll(req, query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.locationService.findOne(id);
  }

  @Patch(':id')
  @ApiBody({
    type: CreateLocationDto
  })
  update(@Param('id') id: string, @Body() updateLocationDto: UpdateLocationDto) {
    return this.locationService.update(id, updateLocationDto);
  }
  /*
    @Delete(':id')
    remove(@Param('id') id: string) {
      this.logger.error("Forbidden")
      throw new HttpException("Forbidden", HttpStatus.FORBIDDEN);
      return this.locationService.remove(id);
    }*/
}
