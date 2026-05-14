// src/interfaces/modules/order.module.ts
import { Module } from '@nestjs/common';
import { OrderController } from '../controllers/order.controller';
import { CreateOrderUseCase } from '../../application/useCases/Order/CreateOrder.usecase';
import { AcceptOrderUseCase } from '../../application/useCases/Order/AcceptOrder.usecase';
import { DistributeOrderUseCase } from '../../application/useCases/Order/DistributeOrder.usecase';
import { CheckExpiredOrdersUseCase } from '../../application/useCases/Order/CheckExpiredOrders.usecase';
import { NotificationService } from '../services/notification.service';
import { ExpiredOrdersCronService } from '../services/ExpiredOrdersCron.service';

@Module({
  imports: [
    // ❌ УБЕРИ TypeOrmModule.forFeature() — он уже в глобальном DatabaseModule
  ],
  controllers: [OrderController],
  providers: [
    CreateOrderUseCase,
    AcceptOrderUseCase,
    DistributeOrderUseCase,
    NotificationService,
    ExpiredOrdersCronService,
    CheckExpiredOrdersUseCase,
    // ❌ УБЕРИ ЭТИ БЛОКИ:
    // {
    //   provide: ORDER_REPOSITORY_TOKEN,
    //   useClass: OrderRepository,
    // },
    // {
    //   provide: USER_REPOSITORY_TOKEN,
    //   useClass: UserRepository,
    // },
  ],
  exports: [
    CreateOrderUseCase,
    AcceptOrderUseCase,
    DistributeOrderUseCase,
    NotificationService,
    CheckExpiredOrdersUseCase,
  ],
})
export class OrderModule {}
