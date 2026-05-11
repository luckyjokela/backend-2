// src/application/useCases/Order/DistributeOrder.usecase.ts
import { Injectable, Logger } from '@nestjs/common';
import {
  IOrderRepository,
  ORDER_REPOSITORY_TOKEN,
} from '../../../core/repositories/IOrderRepository.interface';
import {
  IUserRepository,
  USER_REPOSITORY_TOKEN,
} from '../../../core/repositories/IUserRepository.interface';
import { NotificationService } from '../../../interfaces/services/notification.service';
import { OrderStatus } from '../../../core/entities/variableObjects/OrderStatus.enum';
import { Result } from '../../../core/shared/types/Result.type';
import { Inject } from '@nestjs/common';

@Injectable()
export class DistributeOrderUseCase {
  private readonly logger = new Logger(DistributeOrderUseCase.name);

  constructor(
    @Inject(ORDER_REPOSITORY_TOKEN)
    private readonly orderRepo: IOrderRepository,
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepo: IUserRepository,
    private readonly notificationService: NotificationService,
  ) {}

  async execute(orderId: string): Promise<Result<void>> {
    try {
      const order = await this.orderRepo.findById(orderId);
      if (!order || order.getStatus() !== OrderStatus.NEW) {
        return { success: false, error: 'Order not found or already assigned' };
      }

      // 1. Получаем всех makers
      const allUsers = await this.userRepo.findAll();
      const allMakers = allUsers.filter((user) => user.isMaker());

      this.logger.log(`📊 Found ${allMakers.length} makers total`);

      // 2. Фильтруем по реальным критериям
      const suitableMakers = allMakers.filter((maker) => {
        const hasSkill = maker.hasSkill(order.getCakeType());
        const isOnline = maker.isOnlineStatus();

        if (!hasSkill) {
          this.logger.debug(
            `Maker ${maker.getIdValue()} lacks skill ${order.getCakeType()}`,
          );
        }
        if (!isOnline) {
          this.logger.debug(`Maker ${maker.getIdValue()} is offline`);
        }

        return hasSkill && isOnline;
      });

      this.logger.log(`✅ Found ${suitableMakers.length} suitable makers`);

      // 3. Отправляем РЕАЛЬНЫЕ уведомления
      for (const maker of suitableMakers) {
        await this.notificationService.sendToMaker(maker.getIdValue(), {
          message: `🎂 Новый заказ: ${order.getCakeType()} на ${order.getRequestedDate().toLocaleDateString()}`,
          orderId: order.getIdValue(),
          type: 'NEW_ORDER',
        });
      }

      return { success: true };
    } catch (error) {
      this.logger.error('Distribution failed', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Distribution failed',
      };
    }
  }
}
