import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, Inject, ValidationPipe, UsePipes, Req, Query } from '@nestjs/common';
import { UserReportService } from './user-report.service';
import { CreateUserReportDto } from './dto/create-user-report.dto';
import { UpdateUserReportDto } from './dto/update-user-report.dto';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { Http2ServerRequest } from 'http2';


@ApiTags('user-report')
@Controller('user-report')
export class UserReportController {
  constructor(
    private readonly userReportService: UserReportService,
    @Inject('winston') private readonly logger: Logger,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Req() req: Http2ServerRequest, @Body() createUserReportDto: CreateUserReportDto) {
    return this.userReportService.create(req, createUserReportDto);
  }

  @Get('/:operation/:uid')
  findAll(@Req() req: Http2ServerRequest, @Query() query: any, @Param("operation") operation: string, @Param("uid") uid: string) {
    let reported: boolean = (operation && operation.toLowerCase() == "reported")
      return this.userReportService.findAll(req, query, reported, uid);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userReportService.remove(id);
  }
}
