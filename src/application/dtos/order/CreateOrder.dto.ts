import {
  IsString,
  IsEnum,
  IsArray,
  IsDateString,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { CakeType } from '../../../core/entities/variableObjects/CakeType.enum';

export class CreateOrderDto {
  @IsUUID()
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
