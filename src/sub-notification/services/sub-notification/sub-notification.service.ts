// sub-notification.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SubNotification } from 'src/sub-notification/sub-notification.entity';

@Injectable()
export class SubNotificationService {
  constructor(
    @InjectModel(SubNotification)
    private readonly subNotificationModel: typeof SubNotification,
  ) {}

  async findAll(): Promise<SubNotification[]> {
    return this.subNotificationModel.findAll();
  }

  async findOne(id: number): Promise<SubNotification> {
    return this.subNotificationModel.findByPk(id);
  }

  async create(
    subNotificationData: Partial<SubNotification>,
  ): Promise<SubNotification> {
    return this.subNotificationModel.create(subNotificationData);
  }

  async update(
    id: number,
    subNotificationData: Partial<SubNotification>,
  ): Promise<[number, SubNotification[]]> {
    const [affectedCount, updatedSubNotifications] =
      await this.subNotificationModel.update(subNotificationData, {
        where: { id },
        returning: true,
      });

    return [affectedCount, updatedSubNotifications];
  }

  async remove(id: number): Promise<void> {
    await this.subNotificationModel.destroy({ where: { id } });
  }

  async markAsRead(subscriberId: number, notificationId: number): Promise<void> {
    await this.subNotificationModel.update({ has_read: true }, {
      where: { subscriber_id: subscriberId, notification_id: notificationId },
    });
  }
}
