import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { FollowerService } from './follower.service';
import { CreateFollowerDto } from './dto/create-follower.dto';
import { UpdateFollowerDto } from './dto/update-follower.dto';
import { Http2ServerRequest } from 'http2';
import { ApiTags } from '@nestjs/swagger';
import { NONAME } from 'dns';

@ApiTags('follower')
@Controller('follower')
export class FollowerController {
  constructor(private readonly followerService: FollowerService) {}

  @Post('/:operation/:followed')
  create(@Req() req: Http2ServerRequest, @Param("operation") operation: string, @Param("followed") followed: string ) {
    if (operation && operation.toLowerCase() == "follow")
      return this.followerService.follow(req, followed);
    else if (operation && operation.toLowerCase() == "unfollow") 
      return this.followerService.unfollow(req, followed);
  }

  /*
  @Get()
  findAll() {
    return this.followerService.findAll();
  }
*/

  @Get('/:operation/:name')
  find(@Req() req: Http2ServerRequest, @Param("operation") operation: string, @Param("name") name: string, @Query() query: any) {
    if (operation && operation.toLowerCase() == "follower")
      if(name && name.toLowerCase() == "count")
        return this.followerService.getFollowCount(req, query);
      else if (name && name.toLowerCase() == "list")
        return this.followerService.getFollow(req, query);
  }

  /*
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.followerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFollowerDto: UpdateFollowerDto) {
    return this.followerService.update(id, updateFollowerDto);
  }
*/
/*
  @Delete(':id')
  remove(@Req() req: Http2ServerRequest, @Param('id') id: string) {
    return this.followerService.unfollow(req, id);
  }
  */
}
