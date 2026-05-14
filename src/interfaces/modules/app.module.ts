// src/interfaces/modules/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { AdminModule } from './admin.module';
import { AuthModule } from '../../auth/modules/auth.module';
import { UserModule } from './user.module';
import { OrderModule } from './order.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppPostgreSQLDataSource } from '../../infrastructure/persistence/typeorm/data-source';
import { DatabaseModule } from './database.module';
import { RepositoriesModule } from './repositories.module'; // ← Убедись, что импортирован

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),

    TypeOrmModule.forRoot({
      ...AppPostgreSQLDataSource.options,
      autoLoadEntities: true,
    }),

    ScheduleModule.forRoot(),

    DatabaseModule, // ✅ Глобальный: Entity
    RepositoriesModule, // ✅ Глобальный: репозитории

    AdminModule,
    AuthModule,
    UserModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
