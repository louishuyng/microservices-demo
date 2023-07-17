import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { HealthState, Service } from '../service/service.entity';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class CronjobsService {
  private readonly logger = new Logger(CronjobsService.name);

  constructor(
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
    private readonly httpService: HttpService,
  ) { }

  // Every 15 seconds
  @Cron('*/15 * * * * *')
  async checkHealthForAllServices() {
    this.logger.debug('Check Health for all services');

    const services = await this.serviceRepository.find();

    for (const service of services) {
      this.logger.debug(`Check Health for ${service.name}`);
      this.logger.debug(`--> Call ${service.healthCheckUrl}`);

      try {
        const result = await this.httpService.axiosRef.get(
          service.healthCheckUrl,
        );
        if (result.status === 200) {
          service.healthState = HealthState.HEALTHY;
        } else {
          service.healthState = HealthState.UNHEALTHY;
        }
      } catch (e) {
        service.healthState = HealthState.UNHEALTHY;
      } finally {
        this.logger.debug(
          `Health state for ${service.name}: ${service.healthState} `,
        );

        service.save();
      }
    }
  }
}
