import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtController } from './jwt.controller';
import { JwtService } from './jwt.service';
import { Token, TokenSchema } from './jwt.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
  ],
  controllers: [JwtController],
  providers: [JwtService],
})
export class JwtModule { }
