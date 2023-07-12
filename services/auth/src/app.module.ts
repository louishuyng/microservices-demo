import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://admin:123456@localhost:27017')], // TODO: add environment variable for username and password
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
