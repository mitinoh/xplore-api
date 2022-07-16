import { Controller, Get, Post, Body, Patch, Param, Delete, Req, ValidationPipe, UsePipes, HttpException, HttpStatus, Inject, Logger, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Http2ServerRequest } from 'http2';
import { MongoQuery, MongoQueryModel } from 'nest-mongo-query-parser';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject('winston')  private readonly logger: Logger,) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Req() req: Http2ServerRequest, @Body() createUserDto: CreateUserDto) {
    return this.userService.create(req, createUserDto);
  }

  @Get()
  findAll(@Req() req: Http2ServerRequest, @Query() query: any) {
    return this.userService.findAll(req, query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch()
  update(@Req() req: Http2ServerRequest, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(req, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.logger.error("Forbidden")
    throw new HttpException("Forbidden", HttpStatus.FORBIDDEN);
    return this.userService.remove(id);
  }
}
