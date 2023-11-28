import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupModule } from './group/group.module';
import { PersonModule } from './person/person.module';
import { Group } from './group/group.entity';
import { Person } from './person/person.entity';
import { Details } from './person/details.entity';
import { User } from './user/user.entity';
import { ConfigService } from '@nestjs/config';
import { validate } from './validation/env.validation';
import { AuthModule } from './auth/auth.module';
import { TestModule } from './test/test.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mariadb',
        url: configService.get<string>('SQL_CONNECTION_STRING'),
        entities: [Group, Person, Details],
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      name: 'mongodb',
      useFactory: (configService: ConfigService) => ({
        type: 'mongodb',
        url: configService.get<string>('MONGODB_CONNECTION_STRING'),
        entities: [User],
      }),
      inject: [ConfigService],
    }),
    GroupModule,
    PersonModule,
    AuthModule,
    TestModule,
  ],
})
export class AppModule {}
