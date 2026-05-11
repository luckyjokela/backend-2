import { IsString, IsUUID } from 'class-validator';

export class AcceptOrderDto {
  @IsUUID()
  orderId!: string;

  @IsString()
  makerId!: string;
}
