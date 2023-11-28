import {
  Controller,
  Get,
  Header,
  Param,
  Render,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { FindOneParams } from './findone.params.dto';
import { PersonService } from './person.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/user/user.entity';
import { HttpExceptionFilter } from 'src/error/http-exception.filter';

@UseFilters(HttpExceptionFilter)
@Controller('person')
export class PersonController {
  constructor(private personService: PersonService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':personId')
  @Header('Content-Type', 'text/xml')
  @Render('person.findone.hbs')
  async findOne(@Param() params: FindOneParams, @GetUser() user: User) {
    return await this.personService.findOne(user.userId, params.personId);
  }
}
