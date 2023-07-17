import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Action } from './action.entity';
import { Repository } from 'typeorm';
import { CreateActionDto } from './dto/create.dto';

@Controller('actions')
export class ActionController {
  constructor(
    @InjectRepository(Action)
    private actionRepository: Repository<Action>,
  ) { }

  @Post()
  @HttpCode(201)
  async createAction(@Body(ValidationPipe) createActionDto: CreateActionDto) {
    {
      try {
        const service = await this.actionRepository
          .create(createActionDto)
          .save();
        return service;
      } catch (error) {
        throw new HttpException(
          {
            message: error.message,
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }
}
