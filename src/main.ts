import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './interfaces/modules/app.module';
import { AppPostgreSQLDataSource } from './infrastructure/persistence/typeorm/data-source';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    await AppPostgreSQLDataSource.initialize();

    const configService = app.get(ConfigService);
    const siteOrigin = configService.get<string>('myOrigin');
    app.enableCors({
      origin: siteOrigin,
      credentials: true,
    });

    app.use(cookieParser('secretKeyForCookieParser'));

    const port = configService.get<number>('PORT', 3001);
    const nginxIp = configService.get<string>('localIp', '0.0.0.0');

    await app.listen(port, nginxIp);
  } catch (error) {
    console.error('🚫 Ошибка при запуске сервера:', error);
    throw error;
  }
}

void bootstrap();
