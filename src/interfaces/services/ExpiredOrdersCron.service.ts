import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CheckExpiredOrdersUseCase } from '../../application/useCases/Order/CheckExpiredOrders.usecase';
// import { NotificationService } from './notification.service';

@Injectable()
export class ExpiredOrdersCronService {
  private readonly logger = new Logger(ExpiredOrdersCronService.name);

  constructor(
    private readonly checkExpiredUseCase: CheckExpiredOrdersUseCase,
  ) {}

  /**
   * Запускается каждые 6 часов автоматически
   * Проверяет заказы, которые висят в статусе NEW дольше 24 часов
   */
  @Cron(CronExpression.EVERY_6_HOURS)
  async handleExpiredOrdersCheck() {
    this.logger.log('🔍 Starting expired orders check...');

    try {
      const result = await this.checkExpiredUseCase.execute(24);

      if (result.success && result.data && result.data.length > 0) {
        this.logger.warn(
          `⚠️ Found ${result.data.length} expired orders without assignment:`,
          result.data,
        );
        // Здесь можно добавить отправку уведомления админу:
        // await this.adminNotificationService.sendAlert({
        //   type: 'EXPIRED_ORDERS',
        //   orderIds: result.data,
        // });
      } else {
        this.logger.debug('✅ No expired orders found');
      }
    } catch (error) {
      this.logger.error(
        '❌ Failed to check expired orders',
        error instanceof Error ? error.stack : error,
      );
    }
  }

  /**
   * Опционально: ручная проверка по запросу (для тестов / админки)
   */
  async triggerManualCheck(thresholdHours = 24) {
    this.logger.log(
      `🔍 Manual expired orders check (threshold: ${thresholdHours}h)`,
    );
    return this.checkExpiredUseCase.execute(thresholdHours);
  }
}
