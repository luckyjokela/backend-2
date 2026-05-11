import {
  IsString,
  IsEnum,
  IsArray,
  IsDateString,
  IsOptional,
} from 'class-validator';
import { CakeType } from '../../../core/entities/variableObjects/CakeType.enum';

export class CreateOrderDto {
  @IsString()
  customerId!: string;

  @IsEnum(CakeType)
  cakeType!: CakeType;

  @IsArray()
  @IsString({ each: true })
  layers!: string[];

  @IsString()
  filling!: string;

  @IsDateString()
  requestedDate!: string;

  @IsOptional()
  @IsString()
  description?: string;
}
