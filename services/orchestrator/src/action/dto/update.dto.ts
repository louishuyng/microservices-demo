import { IsString, IsNumber, IsEnum, IsOptional } from 'class-validator';
import { RequestMethod } from '../action.entity';

export class UpdateActionDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  apiPath: string;

  @IsEnum(RequestMethod)
  @IsOptional()
  requestMethod: RequestMethod;

  @IsNumber()
  @IsOptional()
  serviceId: number;
}
