import { IsString, IsNumber, IsObject } from 'class-validator';

export class CreateActionDto {
  @IsString()
  name: string;

  @IsString()
  apiPath: string;

  @IsObject()
  service: { id: number };
}
