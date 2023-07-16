import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ActionModule } from './action/action.module';
import { UsecaseModule } from './usecase/usecase.module';
import { ServiceModule } from './service/service.module';
import { FlowModule } from './flow/flow.module';
import { UsecaseRequestModule } from './usecase-request/usecase-request.module';
import { LoggingModule } from './logging/logging.module';
import * as typeOrmConfig from './typeorm.config';
import { ScheduleModule } from '@nestjs/schedule';
import { CronjobsModule } from './cronjobs/cronjobs.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ScheduleModule.forRoot(),
    ServiceModule,
    ActionModule,
    UsecaseModule,
    FlowModule,
    UsecaseRequestModule,
    LoggingModule,
    CronjobsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
