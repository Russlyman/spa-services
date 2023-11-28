import { Controller, Get, Req, Res } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';

@Controller('test')
export class TestController {
  @Get()
  test(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    res.cookie('TEST', 'TEST', {
      path: '/',
    });
    res.view('test.hbs');
  }

  @Get('lol')
  test1(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    console.log(req.cookies);
    res.view('test2.hbs');
  }
}
