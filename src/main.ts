import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import fastifyCookie from '@fastify/cookie';
import handlebars from 'handlebars';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.useStaticAssets({
    root: join(__dirname, '..', 'public'),
    prefix: '/public/',
  });

  app.setViewEngine({
    engine: {
      handlebars,
    },
    templates: join(__dirname, '..', 'views'),
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  await app.register(fastifyCookie, {
    secret: 'test',
  });

  const configService = app.get(ConfigService);

  await app.listen(
    configService.get<number>('PORT', 3000),
    configService.get<string>('HOST', '127.0.0.1'),
  );
}

bootstrap();
