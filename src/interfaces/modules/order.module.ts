import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from '../../infrastructure/persistence/typeorm/entities/OrderEntity';
import { OrderController } from '../controllers/order.controller';
import { CreateOrderUseCase } from '../../application/useCases/Order/CreateOrder.usecase';
import { AcceptOrderUseCase } from '../../application/useCases/Order/AcceptOrder.usecase';
import { DistributeOrderUseCase } from '../../application/useCases/Order/DistributeOrder.usecase';
import { OrderRepository } from '../../infrastructure/persistence/typeorm/repositories/OrderRepository';
import { ORDER_REPOSITORY_TOKEN } from '../../core/repositories/IOrderRepository.interface';
import { USER_REPOSITORY_TOKEN } from '../../core/repositories/IUserRepository.interface';
import { UserRepository } from '../../infrastructure/persistence/typeorm/repositories/UserRepository';
import { NotificationService } from '../services/notification.service';
import { ExpiredOrdersCronService } from '../services/ExpiredOrdersCron.service';
import { NotificationEntity } from '../../infrastructure/persistence/typeorm/entities/NotificationEntity';
import { UserEntity } from '../../infrastructure/persistence/typeorm/entities/UserEntity';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity, NotificationEntity, UserEntity]),
    ScheduleModule,
  ],
  controllers: [OrderController],
  providers: [
    CreateOrderUseCase,
    AcceptOrderUseCase,
    DistributeOrderUseCase,
    NotificationService,
    ExpiredOrdersCronService,
    {
      provide: ORDER_REPOSITORY_TOKEN,
      useClass: OrderRepository,
    },
    {
      provide: USER_REPOSITORY_TOKEN,
      useClass: UserRepository,
    },
  ],
  exports: [CreateOrderUseCase, AcceptOrderUseCase, DistributeOrderUseCase],
})
export class OrderModule {}
