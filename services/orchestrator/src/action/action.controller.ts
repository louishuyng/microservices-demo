import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Action } from './action.entity';
import { FindOptionsSelectByString, Like, Repository } from 'typeorm';
import { CreateActionDto } from './dto/create.dto';
import { UpdateActionDto } from './dto/update.dto';

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
  async getActions(@Query() query: any): Promise<Action[]> {
    const { filter_by, filter_value, search } = query;

    const select: FindOptionsSelectByString<Action> = [
      'id',
      'name',
      'apiPath',
      'serviceId',
    ];

    if (!filter_by && !search) {
      return await this.actionRepository.find({
        select,
      });
    }

    if (search && !filter_by) {
      return await this.actionRepository.find({
        where: {
          name: Like(`%${search}%`),
        },
      });
    }

    if (search && filter_by && filter_value) {
      return await this.actionRepository.find({
        where: {
          name: Like(`%${search}%`),
          [filter_by]: filter_value,
        },
      });
    }

    if (filter_by && filter_value) {
      return await this.actionRepository.find({
        select,
        where: { serviceId: filter_value },
      });
    }
  }

  @Get(':id')
  @HttpCode(200)
  async getActionById(@Param() params: any): Promise<Action> {
    const { id } = params;

    const action = await this.actionRepository.findOneBy({ id });
    return action;
  }

  @Put(':id')
  @HttpCode(200)
  async updateAction(
    @Param() params: any,
    @Body(ValidationPipe) updateActionDto: UpdateActionDto,
  ): Promise<Action> {
    const { id } = params;
    try {
      await this.actionRepository.update({ id }, updateActionDto);
      return await this.actionRepository.findOneBy({ id });
    } catch (error) {
      throw new HttpException(
        {
          message: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  @HttpCode(200)
  async deleteActionById(@Param() params: any): Promise<void> {
    const { id } = params;
    try {
      await this.actionRepository.delete({ id });
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
