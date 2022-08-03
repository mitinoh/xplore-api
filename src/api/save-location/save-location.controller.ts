import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { SaveLocationService } from './save-location.service';
import { CreateSaveLocationDto } from './dto/create-save-location.dto';
import { UpdateSaveLocationDto } from './dto/update-save-location.dto';
import { MongoQuery, MongoQueryModel } from 'nest-mongo-query-parser';
import { Http2ServerRequest } from 'http2';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('save-location')
@Controller('save-location')
export class SaveLocationController {
  constructor(private readonly saveLocationService: SaveLocationService) {}



  @ApiQuery({ name: 'uid', type: 'objecId', required: false })
  @ApiQuery({ name: 'location', type: 'objectId', required: false })
  @Get()
  findAll(@Req() req: Http2ServerRequest, @Query() query: any) {
    return this.saveLocationService.findAll(req, query);
  }

  /*
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saveLocationService.findOne(id);
  }
  */

  @Patch(':id')
  toggle(@Req() req: Http2ServerRequest, @Param('id') id: string) {
    return this.saveLocationService.toggleLike(req, id);
  }



  /**
   * @deprecated 
   */
  /*
    @Delete(':id')
    remove(@Req() req: Http2ServerRequest, @Param('id') id: string) {
      return this.saveLocationService.remove(req, id);
    }
    */

    /**
   * @deprecated 
   */
  /*
    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    create(@Req() req: Http2ServerRequest, @Body() createSaveLocationDto: CreateSaveLocationDto) {
      return this.saveLocationService.create(req, createSaveLocationDto);
    }*/
}
