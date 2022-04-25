import { Controller, Get, Post, Body, Patch, Param, Delete, Req, ValidationPipe, UsePipes, HttpException, HttpStatus, Inject, Logger } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Http2ServerRequest } from 'http2';
import { MongoQuery, MongoQueryModel } from 'nest-mongo-query-parser';

@Controller('api/user')
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
  findAll(@MongoQuery() query: MongoQueryModel) {
    return this.userService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.logger.error("Forbidden")
    throw new HttpException("Forbidden", HttpStatus.FORBIDDEN);
    return this.userService.remove(id);
  }
}
