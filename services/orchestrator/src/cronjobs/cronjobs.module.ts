import { Module } from '@nestjs/common';
import { CronjobsService } from './cronjobs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from '../service/service.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([Service]), HttpModule],
  providers: [CronjobsService],
})
export class CronjobsModule { }
