import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Http2ServerRequest } from 'http2';
import { MongoQuery, MongoQueryModel } from 'nest-mongo-query-parser';
import { CreateNewLocationDto } from './dto/create-new-location.dto';
import { UpdateNewLocationDto } from './dto/update-new-location.dto';
import { NewLocationService } from './new-location.service';

@ApiTags('new-location')
@Controller('new-location')
export class NewLocationController {
  constructor(private readonly newLocationService: NewLocationService) { }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Req() req: Http2ServerRequest, @Body() createNewLocationDto: CreateNewLocationDto) {
    return this.newLocationService.create(req, createNewLocationDto);
  }

  @ApiQuery({ name: 'name', type: 'string', required: false })
  @ApiQuery({ name: 'desc', type: 'string', required: false })
  @ApiQuery({ name: 'indication', type: 'string', required: false })
  @ApiQuery({ name: 'uid', type: 'objectId', required: false })
  @ApiQuery({ name: 'locationCategory', type: 'objectId', required: false })
  @ApiQuery({ name: 'cdate', type: 'Date', required: false })
  @Get()
  findAll(@MongoQuery() query: MongoQueryModel) {
    return this.newLocationService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newLocationService.findOne(id);
  }

  @Patch(':id')
  @ApiBody({
    type: CreateNewLocationDto
  })
  update(@Param('id') id: string, @Body() updateNewLocationDto: UpdateNewLocationDto) {
    return this.newLocationService.update(id, updateNewLocationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newLocationService.remove(id);
  }
}
