import { Injectable } from '@nestjs/common';
import {
  IOrderRepository,
  ORDER_REPOSITORY_TOKEN,
} from '../../../core/repositories/IOrderRepository.interface';
import { Order } from '../../../core/entities/Order';
import { CakeType } from '../../../core/entities/variableObjects/CakeType.enum';
import { Result } from '../../../core/shared/types/Result.type';
import { Inject } from '@nestjs/common';

export interface CreateOrderCommand {
  customerId: string;
  cakeType: CakeType;
  layers: string[];
  filling: string;
  requestedDate: Date;
  description: string;
}

@Injectable()
export class CreateOrderUseCase {
  constructor(
    @Inject(ORDER_REPOSITORY_TOKEN)
    private readonly orderRepo: IOrderRepository,
  ) {}

  async execute(cmd: CreateOrderCommand): Promise<Result<Order>> {
    // ✅ Сначала создаём Order через Result
    const orderResult = Order.create(
      cmd.customerId,
      cmd.cakeType,
      cmd.layers,
      cmd.filling,
      cmd.requestedDate,
      cmd.description,
    );

    // ✅ Проверяем успех
    if (!orderResult.success) {
      return { success: false, error: orderResult.error };
    }

    // ✅ Берём Order из .data
    const order = orderResult.data;

    // ✅ Теперь сохраняем Order (а не Result<Order>)
    await this.orderRepo.save(order);

    return { success: true, data: order };
  }
}
