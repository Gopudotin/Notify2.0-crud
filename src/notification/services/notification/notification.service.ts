// notification.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Notification } from 'src/notification/notification.entity';
import { NotificationType } from 'src/type/type.entity';
import { NotificationTemplate } from 'src/template/template.entity';
import { CreateNotificationDto } from 'src/notification/create-notification.dto';
import { SubscriberService } from 'src/subscribers/services/subscribers/subscribers.service';
import { SubNotification } from 'src/sub-notification/sub-notification.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification)
    private readonly notificationModel: typeof Notification,
    @InjectModel(NotificationTemplate)
    private readonly notificationTemplateModel: typeof NotificationTemplate,
    @InjectModel(NotificationType)
    private readonly notificationTypeModel: typeof NotificationType,
    private readonly subscriberService: SubscriberService,
    @InjectModel(SubNotification)
    private readonly subNotificationModel: typeof SubNotification,
  ) {}

  async create(
    createNotificationDto: CreateNotificationDto,
  ): Promise<Notification[]> {
    const { type_id, template_id, subscribers } = createNotificationDto;

    // Find notification type and template
    const type = await this.notificationTypeModel.findByPk(type_id);
    if (!type) {
      throw new Error('Notification type not found');
    }
    const template = await this.notificationTemplateModel.findByPk(template_id);
    if (!template) {
      throw new Error('Template not found');
    }

    // Fetch subscribers
    const subscribersData = await this.subscriberService.findByIds(subscribers);
    console.log(subscribersData);
    if (!subscribersData || subscribersData.length === 0) {
      throw new Error('Subscribers not found or empty');
    }

    const notifications: Notification[] = [];

    /*const data = {
      name: 'Midhun',
      age: 26,
      subscriberName: 'Midhu..',
    };
*/

    for (const subscriber of subscribersData) {
      let description = template.template;
      // Check if the template contains placeholders
      const placeholders = description.match(/{{(.*?)}}/g);
      if (placeholders) {
        placeholders.forEach((placeholder) => {
          const key = placeholder.replace(/{{|}}/g, '');
          description = description.replace(placeholder, subscriber.name || '');
        });
      } else {
        // If no placeholders, append subscriber's name to the end of the template
        description += `, ${subscriber.name}`;
      }

      // Create notification
      const notification = await this.notificationModel.create({
        title: type.name,
        description,
        // Other fields as needed
      });

      notifications.push(notification);

      // Create entry in sub_notification table
      await this.subNotificationModel.create({
        notification_id: notification.id,
        subscriber_id: subscriber.id,
        has_read: false, // Defaulting has_read to false
      });
    }

    console.log('Notifications created:', notifications); // <-- Added console log
    return notifications;
  }

  async findAll(): Promise<Notification[]> {
    return this.notificationModel.findAll();
  }

  async findOne(id: number): Promise<Notification> {
    return this.notificationModel.findByPk(id);
  }

  async update(
    id: number,
    updatedData: Partial<Notification>,
  ): Promise<Notification> {
    const notification = await this.notificationModel.findByPk(id);
    await notification.update(updatedData);
    return notification;
  }

  async remove(id: number): Promise<void> {
    const notification = await this.notificationModel.findByPk(id);
    await notification.destroy();
  }
}
