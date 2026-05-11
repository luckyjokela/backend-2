import { Injectable, NotFoundException } from '@nestjs/common';
import {
  IOrderRepository,
  ORDER_REPOSITORY_TOKEN,
} from '../../../core/repositories/IOrderRepository.interface';
import { Order } from '../../../core/entities/Order';
import { Result } from '../../../core/shared/types/Result.type';
import { Inject } from '@nestjs/common';

@Injectable()
export class AcceptOrderUseCase {
  constructor(
    @Inject(ORDER_REPOSITORY_TOKEN)
    private readonly orderRepo: IOrderRepository,
  ) {}

  async execute(orderId: string, makerId: string): Promise<Result<Order>> {
    try {
      const order = await this.orderRepo.findById(orderId);
      if (!order) {
        throw new NotFoundException('Order not found');
      }

      order.assignToMaker(makerId);
      await this.orderRepo.save(order);

      return { success: true, data: order };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Accept failed',
      };
    }
  }
}
