import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Action } from './action.entity';
import { FindOptionsSelectByString, Like, Repository } from 'typeorm';
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

  @Get()
  @HttpCode(200)
  async getAction(@Query() query: any): Promise<Action[]> {
    const { filter_by, filter_value } = query;
    console.log(query);

    const select: FindOptionsSelectByString<Action> = [
      'id',
      'name',
      'apiPath',
      'serviceId',
    ];

    if (!filter_by || !filter_value) {
      return await this.actionRepository.find({
        select,
      });
    }

    if (filter_by === 'name') {
      return await this.actionRepository.find({
        where: { name: Like(`%${filter_value}%`) },
        select,
      });
    }

    if (filter_by === 'serviceId') {
      return await this.actionRepository.find({
        select,
        where: { serviceId: filter_value },
      });
    }
  }
}
