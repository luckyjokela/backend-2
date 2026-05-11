// src/application/useCases/Order/CheckExpiredOrders.usecase.ts
import { Injectable } from '@nestjs/common';
import {
  IOrderRepository,
  ORDER_REPOSITORY_TOKEN,
} from '../../../core/repositories/IOrderRepository.interface';
import { OrderStatus } from '../../../core/entities/variableObjects/OrderStatus.enum';
import { Result } from '../../../core/shared/types/Result.type';
import { Inject } from '@nestjs/common';

@Injectable()
export class CheckExpiredOrdersUseCase {
  constructor(
    @Inject(ORDER_REPOSITORY_TOKEN)
    private readonly orderRepo: IOrderRepository,
  ) {}

  /**
   * Проверяет заказы, которые висят в статусе NEW дольше thresholdHours
   * и возвращает список "просроченных" для уведомления админа
   */
  async execute(thresholdHours: number = 24): Promise<Result<string[]>> {
    try {
      const newOrders = await this.orderRepo.findByStatus(OrderStatus.NEW);

      const expiredOrderIds = newOrders
        .filter((order) => order.isExpired(thresholdHours))
        .map((order) => order.getIdValue());

      // Здесь можно вызвать NotificationService для отправки алерта админу
      if (expiredOrderIds.length > 0) {
        console.warn(
          `[ALERT] ${expiredOrderIds.length} orders expired without assignment:`,
          expiredOrderIds,
        );
      }

      return { success: true, data: expiredOrderIds };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'Failed to check expired orders',
      };
    }
  }
}
