import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtController } from './jwt.controller';
import { Token, TokenSchema } from './jwt.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
  ],
  controllers: [JwtController],
})
export class JwtModule { }
