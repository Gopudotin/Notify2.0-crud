// notification.service.ts
import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from 'src/notification/create-notification.dto';
import { Notification } from 'src/notification/notification.entity';
import { SubNotification } from 'src/sub-notification/sub-notification.entity';
import { SubscriberService } from 'src/subscribers/services/subscribers/subscribers.service';
import { NotificationType } from 'src/type/type.entity';
import { NotificationTemplate } from 'src/template/template.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class NotificationService {
  constructor(
    private readonly subscriberService: SubscriberService,
    @InjectModel(Notification)
    private readonly notificationModel: typeof Notification,
    @InjectModel(NotificationTemplate)
    private readonly notificationTemplateModel: typeof NotificationTemplate,
    @InjectModel(NotificationType)
    private readonly notificationTypeModel: typeof NotificationType,
    @InjectModel(SubNotification)
    private readonly subNotificationModel: typeof SubNotification,
  ) {}

  async create(
    createNotificationDto: CreateNotificationDto,
  ): Promise<Notification[]> {
    await this.saveToDatabase(createNotificationDto);
    return []; // Return an empty array
  }

  async saveToDatabase(
    createNotificationDto: CreateNotificationDto,
  ): Promise<void> {
    const { type_id, template_id, subscribers } = createNotificationDto;

    const type = await this.notificationTypeModel.findByPk(type_id);
    if (!type) {
      throw new Error('Notification type not found');
    }

    const template = await this.notificationTemplateModel.findByPk(template_id);
    if (!template) {
      throw new Error('Template not found');
    }

    const subscribersData = await this.subscriberService.findByIds(subscribers);
    if (!subscribersData || subscribersData.length === 0) {
      throw new Error('Subscribers not found or empty');
    }

    for (const subscriber of subscribersData) {
      let description = template.template;
      const placeholders = description.match(/{{(.*?)}}/g);
      if (placeholders) {
        placeholders.forEach((placeholder) => {
          const key = placeholder.replace(/{{|}}/g, '');
          description = description.replace(placeholder, subscriber.name || '');
        });
      } else {
        description += `, ${subscriber.name}`;
      }

      const notification = await this.notificationModel.create({
        title: type.name,
        description,
      });

      await this.subNotificationModel.create({
        notification_id: notification.id,
        subscriber_id: subscriber.id,
        has_read: false,
      });
    }
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
