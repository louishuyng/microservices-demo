import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  name: string;

  @IsString()
  host: string;

  @IsNumber()
  @IsOptional()
  port: number;
}
