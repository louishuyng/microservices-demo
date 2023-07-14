import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from './jwt/jwt.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://admin:123456@localhost:27017'),
    JwtModule,
  ], // TODO: add environment variable for username and password
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
