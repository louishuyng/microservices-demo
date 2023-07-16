import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateServiceDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  host: string;

  @IsNumber()
  @IsOptional()
  port: number;
}
