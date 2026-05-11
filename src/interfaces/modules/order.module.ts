import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from '../../infrastructure/persistence/typeorm/entities/OrderEntity';
import { OrderController } from '../controllers/order.controller';
import { CreateOrderUseCase } from '../../application/useCases/Order/CreateOrder.usecase';
import { AcceptOrderUseCase } from '../../application/useCases/Order/AcceptOrder.usecase';
import { DistributeOrderUseCase } from '../../application/useCases/Order/DistributeOrder.usecase';
import {
  OrderRepository,
  ORDER_REPOSITORY_TOKEN,
} from '../../infrastructure/persistence/typeorm/repositories/OrderRepository';
import { USER_REPOSITORY_TOKEN } from '../../core/repositories/IUserRepository.interface';
import { UserRepository } from '../../infrastructure/persistence/typeorm/repositories/UserRepository';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity])],
  controllers: [OrderController],
  providers: [
    CreateOrderUseCase,
    AcceptOrderUseCase,
    DistributeOrderUseCase,
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
