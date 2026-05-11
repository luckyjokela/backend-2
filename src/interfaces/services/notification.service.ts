// src/interfaces/services/notification.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationEntity } from '../../infrastructure/persistence/typeorm/entities/NotificationEntity';

export interface NotificationData {
  message: string;
  orderId?: string;
  type?: 'NEW_ORDER' | 'ORDER_UPDATED' | 'ORDER_CANCELLED';
}

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  constructor(
    @InjectRepository(NotificationEntity)
    private readonly notificationRepo: Repository<NotificationEntity>,
  ) {}

  /**
   * Сохраняет уведомление в БД
   */
  async sendToMaker(makerId: string, data: NotificationData): Promise<void> {
    const notification = this.notificationRepo.create({
      makerId,
      message: data.message,
      isRead: false,
      createdAt: new Date(),
    });

    await this.notificationRepo.save(notification);

    this.logger.log(
      `📩 Notification saved for Maker ${makerId}: ${data.message}`,
    );
  }

  /**
   * Получает непрочитанные уведомления
   */
  async getUnreadForMaker(makerId: string): Promise<NotificationEntity[]> {
    return this.notificationRepo.find({
      where: { makerId, isRead: false },
      order: { createdAt: 'DESC' },
      take: 50,
    });
  }

  /**
   * Помечает уведомление как прочитанное
   */
  async markAsRead(notificationId: string): Promise<void> {
    await this.notificationRepo.update(notificationId, { isRead: true });
  }

  /**
   * Помечает все уведомления мастера как прочитанные
   */
  async markAllAsRead(makerId: string): Promise<void> {
    await this.notificationRepo.update({ makerId }, { isRead: true });
  }

  /**
   * Удаляет старые уведомления (очистка)
   */
  async deleteOldNotifications(daysOld: number = 30): Promise<void> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);

    const result = await this.notificationRepo
      .createQueryBuilder('notification')
      .delete()
      .where('createdAt < :cutoffDate', { cutoffDate })
      .execute();

    this.logger.log(`🗑️ Deleted ${result.affected} old notifications`);
  }
}
