<<<<<<< HEAD
// псевдокод DistributeOrderUseCase:
// async execute(orderId: string) {
//   const order = await this.orderRepo.findById(orderId);

// 1. Найти подходящих мастеров
//   const makers = await this.userRepo.find({ role: 'MAKER' });

//   const suitableMakers = makers.filter(maker => {
// Проверка навыка
//     const hasSkill = maker.skills.includes(order.cakeType);
// Проверка нагрузки (меньше 3 активных)
//     const isNotBusy = maker.activeOrdersCount < 3;
// Проверка статуса
//     const isOnline = maker.status === 'ONLINE';

//     return hasSkill && isNotBusy && isOnline;
//   });

// 2. Отправить уведомления
//   for (const maker of suitableMakers) {
//     await this.notificationService.send(maker.id, {
//       message: `Новый заказ: ${order.cakeType} на ${order.date}`
//     });
//   }
// }
=======
import { Injectable } from '@nestjs/common';
import {
  IOrderRepository,
  ORDER_REPOSITORY_TOKEN,
} from '../../../core/repositories/IOrderRepository.interface';
import {
  IUserRepository,
  USER_REPOSITORY_TOKEN,
} from '../../../core/repositories/IUserRepository.interface';
import { Order } from '../../../core/entities/Order';
import { OrderStatus } from '../../../core/entities/variableObjects/OrderStatus.enum';
import { CakeType } from '../../../core/entities/variableObjects/CakeType.enum';
import { Result } from '../../../core/shared/types/Result.type';
import { Inject } from '@nestjs/common';

@Injectable()
export class DistributeOrderUseCase {
  constructor(
    @Inject(ORDER_REPOSITORY_TOKEN)
    private readonly orderRepo: IOrderRepository,
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepo: IUserRepository,
  ) {}

  async execute(orderId: string): Promise<Result<void>> {
    try {
      const order = await this.orderRepo.findById(orderId);
      if (!order || order.getStatus() !== OrderStatus.NEW) {
        return { success: false, error: 'Order not found or already assigned' };
      }

      // 1. Найти всех изготовителей
      const allMakers = await this.userRepo.findAllMakers();
      // 2. Фильтр: онлайн + нужный навык + не перегружен (< 3 активных заказов) dfdf
      const suitableMakers = allMakers.filter((maker) => {
        const hasSkill = maker.hasSkill(order.getCakeType());
        const isOnline = maker.isOnline();
        const activeOrders = maker.getActiveOrdersCount();
        const isNotBusy = activeOrders < 3;

        return hasSkill && isOnline && isNotBusy;
      });

      // 3. Отправить уведомления (заглушка — реализовать через EmailService/Telegram)
      for (const maker of suitableMakers) {
        await this.sendNotification(maker.getId().getValue(), {
          orderId: order.getId().getValue(),
          cakeType: order.getCakeType(),
          requestedDate: order.getRequestedDate(),
          description: order.getDescription(),
        });
      }

      return { success: true, data: undefined };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Distribution failed',
      };
    }
  }

  private async sendNotification(makerId: string, payload: any): Promise<void> {
    // TODO: Интеграция с Email / Telegram / Push
    console.log(`[NOTIFY] Maker ${makerId}: New order ${payload.orderId}`);
  }
}
>>>>>>> 33b11ba (update)
