import { Module } from '@nestjs/common';
import { ServiceController } from './service.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Service])],
  controllers: [ServiceController],
})
export class ServiceModule { }
