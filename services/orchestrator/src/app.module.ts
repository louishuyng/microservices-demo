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

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ServiceModule,
    ActionModule,
    UsecaseModule,
    FlowModule,
    UsecaseRequestModule,
    LoggingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
