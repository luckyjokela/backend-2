// src/application/useCases/Order/GetAvailableOrder.usecase.ts
import { Injectable } from '@nestjs/common';
import {
  IOrderRepository,
  ORDER_REPOSITORY_TOKEN,
} from '../../../core/repositories/IOrderRepository.interface';
import { Order } from '../../../core/entities/Order';
import { OrderStatus } from '../../../core/entities/variableObjects/OrderStatus.enum';
import { CakeType } from '../../../core/entities/variableObjects/CakeType.enum';
import { Result } from '../../../core/shared/types/Result.type';
import { Inject } from '@nestjs/common';

@Injectable()
export class GetAvailableOrderUseCase {
  constructor(
    @Inject(ORDER_REPOSITORY_TOKEN)
    private readonly orderRepo: IOrderRepository,
  ) {}

  async execute(
    makerId: string,
    cakeTypes: CakeType[],
  ): Promise<Result<Order[]>> {
    try {
      const orders = await this.orderRepo.findAvailableForMaker(
        makerId,
        cakeTypes,
      );

      // Дополнительная фильтрация на уровне домена (если нужно)
      const available = orders.filter(
        (order) =>
          order.getStatus() === OrderStatus.NEW && !order.isExpired(24), // Не показывать заказы старше 24ч
      );

      return { success: true, data: available };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error ? error.message : 'Failed to fetch orders',
      };
    }
  }
}
