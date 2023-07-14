import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TokenDocument = HydratedDocument<Token>;

@Schema()
export class Token {
  @Prop({ required: true, unique: true })
  access_token: string;

  @Prop()
  expires_in: number;

  @Prop({ required: true, unique: true })
  refresh_token: string;

  @Prop()
  refresh_expires_in: number;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
