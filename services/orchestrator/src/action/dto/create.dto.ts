import { IsString, IsNumber, IsEnum } from 'class-validator';
import { RequestMethod } from '../action.entity';

export class CreateActionDto {
  @IsString()
  name: string;

  @IsString()
  apiPath: string;

  @IsEnum(RequestMethod)
  requestMethod: RequestMethod;

  @IsNumber()
  serviceId: number;
}
