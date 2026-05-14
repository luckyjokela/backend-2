// src/infrastructure/database/database.module.ts
import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../infrastructure/persistence/typeorm/entities/UserEntity';
import { OrderEntity } from '../../infrastructure/persistence/typeorm/entities/OrderEntity';
import { NotificationEntity } from '../../infrastructure/persistence/typeorm/entities/NotificationEntity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, OrderEntity, NotificationEntity]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
