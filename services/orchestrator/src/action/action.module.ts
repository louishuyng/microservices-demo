import { Module } from '@nestjs/common';
import { ActionController } from './action.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Action } from './action.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Action])],
  controllers: [ActionController],
})
export class ActionModule { }
