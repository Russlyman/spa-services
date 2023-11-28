import {
  Controller,
  Get,
  Header,
  Param,
  Query,
  Render,
  Req,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { FindOneParams } from './findone.params.dto';
import { FindOneQuery } from './findone.query.dto';
import { GroupService } from './group.service';
import { CiscoAuthGuard } from 'src/auth/cisco-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FastifyReply, FastifyRequest } from 'fastify';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/user/user.entity';
import { HttpExceptionFilter } from 'src/error/http-exception.filter';
import { GetBaseUrl } from 'src/decorator/get-base-url.decorator';

@UseFilters(HttpExceptionFilter)
@Controller('group')
export class GroupController {
  constructor(
    private groupService: GroupService,
    private authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get(':groupId')
  @Header('Content-Type', 'text/xml')
  @Render('group.findone.hbs')
  async findOne(
    @Param() params: FindOneParams,
    @Query() query: FindOneQuery,
    @GetUser() user: User,
    @GetBaseUrl() baseUrl: string,
  ) {
    const { groupId } = params;
    const { page, search } = query;

    const group = await this.groupService.findOne(
      user.userId,
      groupId,
      page,
      search,
    );

    return {
      name: group.name,
      people: group.people,
      maxPage: group.maxPage + 1,
      page: page + 1,
      search,
      url: `${baseUrl}/person/`,
    };
  }

  @UseGuards(CiscoAuthGuard)
  @Get()
  @Header('Content-Type', 'text/xml')
  @Render('group.findall.hbs')
  async findAll(
    @GetUser() user: User,
    @Req() req: FastifyRequest & { user: User },
    @Res({ passthrough: true }) res: FastifyReply,
    @GetBaseUrl() baseUrl: string,
  ) {
    await this.authService.setCookie(req, res);
    return {
      groups: await this.groupService.findAll(user.userId),
      url: `${baseUrl}/group/`,
    };
  }
}
