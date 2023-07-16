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
  ValidationPipe,
} from '@nestjs/common';
import { CreateServiceDto } from './dto/create.dto';
import { HealthState, Service } from './service.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateServiceDto } from './dto/update.dto';

@Controller('services')
export class ServiceController {
  constructor(
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
  ) { }

  @Post()
  @HttpCode(201)
  async createService(
    @Body(ValidationPipe) createServiceDto: CreateServiceDto,
  ): Promise<Service> {
    try {
      const service = await this.serviceRepository
        .create(createServiceDto)
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

  @Put(':id')
  @HttpCode(200)
  async updateService(
    @Param() params: any,
    @Body(ValidationPipe) updateServiceDto: UpdateServiceDto,
  ): Promise<Service> {
    const { id } = params;
    try {
      await this.serviceRepository.update({ id }, updateServiceDto);
      return await this.serviceRepository.findOneBy({ id });
    } catch (error) {
      throw new HttpException(
        {
          message: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  @HttpCode(200)
  async getServices(): Promise<Service[]> {
    const services = await this.serviceRepository.find({
      select: ['id', 'name', 'healthState', 'host', 'port'],
    });
    return services;
  }

  @Get(':id')
  @HttpCode(200)
  async getServiceById(@Param() params: any): Promise<Service> {
    const { id } = params;

    const service = await this.serviceRepository.findOneBy({ id });
    return service;
  }

  @Delete(':id')
  @HttpCode(200)
  async deleteServiceById(@Param() params: any): Promise<void> {
    const { id } = params;
    try {
      await this.serviceRepository.delete({ id });
    } catch (error) {
      throw new HttpException(
        {
          message: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(':id/health')
  @HttpCode(200)
  async checkServiceHealth(
    @Param() params: any,
  ): Promise<{ isHealthy: boolean }> {
    const { id } = params;

    try {
      const service = await this.serviceRepository.findOneBy({ id });

      return {
        isHealthy: service.healthState === HealthState.HEALTHY,
      };
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
