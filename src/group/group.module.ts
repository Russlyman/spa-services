import { Module } from '@nestjs/common';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from 'src/group/group.entity';
import { Person } from 'src/person/person.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Group]),
    TypeOrmModule.forFeature([Person]),
    AuthModule,
  ],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}
