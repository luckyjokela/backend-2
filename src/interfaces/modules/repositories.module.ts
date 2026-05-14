import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../infrastructure/persistence/typeorm/entities/UserEntity';
import { OrderEntity } from '../../infrastructure/persistence/typeorm/entities/OrderEntity';
import { NotificationEntity } from '../../infrastructure/persistence/typeorm/entities/NotificationEntity';
import { UserRepository } from '../../infrastructure/persistence/typeorm/repositories/UserRepository';
import { OrderRepository } from '../../infrastructure/persistence/typeorm/repositories/OrderRepository';
import { USER_REPOSITORY_TOKEN } from '../../core/repositories/IUserRepository.interface';
import { ORDER_REPOSITORY_TOKEN } from '../../core/repositories/IOrderRepository.interface';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, OrderEntity, NotificationEntity]),
  ],
  providers: [
    {
      provide: USER_REPOSITORY_TOKEN,
      useClass: UserRepository,
    },
    {
      provide: ORDER_REPOSITORY_TOKEN,
      useClass: OrderRepository,
    },
  ],
  exports: [USER_REPOSITORY_TOKEN, ORDER_REPOSITORY_TOKEN, TypeOrmModule],
})
export class RepositoriesModule {}
