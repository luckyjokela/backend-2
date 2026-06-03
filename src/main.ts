import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './interfaces/modules/app.module';
// import { AppPostgreSQLDataSource } from './infrastructure/persistence/typeorm/data-source';
import cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    // await AppPostgreSQLDataSource.initialize();

    const configService = app.get(ConfigService);
    // const siteOrigin = configService.get<string>('myOrigin');
    app.enableCors({
      origin: ['http://localhost:3000', 'http://localhost:3001'],
      credentials: true,
    });

    app.setGlobalPrefix('api');
    app.use(cookieParser('secretKeyForCookieParser'));


    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true, // ! Этот сраный параметр заставляет выбрасывать ошибку, если в запросе есть поля не строгие в DTO. Пример как нужно их типизировать в Register.dto.ts.
        transform: true,
      }),
    );

    const port = configService.get<number>('PORT', 3001);
    const nginxIp = configService.get<string>('localIp', '0.0.0.0');

    await app.listen(port, nginxIp);

    console.log(`🚀 Server running on http://${nginxIp}:${port}`);
    console.log(
      '⏰ ExpiredOrdersCronService will check every 6 hours automatically',
    );
  } catch (error) {
    console.error('🚫 Ошибка при запуске сервера:', error);
    throw error;
  }
}

void bootstrap();
