import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Notification } from 'src/notification/notification.entity';
import { NotificationType } from 'src/type/type.entity';
import { NotificationTemplate } from 'src/template/template.entity';
import { CreateNotificationDto } from 'src/notification/create-notification.dto';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification)
    private readonly notificationModel: typeof Notification,
    @InjectModel(NotificationTemplate)
    private readonly notificationTemplateModel: typeof NotificationTemplate,
    @InjectModel(NotificationType)
    private readonly notificationTypeModel: typeof NotificationType,
  ) {}

  async create(
    createNotificationDto: CreateNotificationDto,
  ): Promise<Notification[]> {
    const { type_id, template_id, subscribers } = createNotificationDto;

    // Retrieve the selected template
    const template = await this.notificationTemplateModel.findByPk(template_id);
    if (!template) {
      throw new Error('Template not found');
    }

    // Retrieve the notification type
    const type = await this.notificationTypeModel.findByPk(type_id);
    if (!type) {
      throw new Error('Notification type not found');
    }

    // we are collecting all created notifications in the notifications array and return that array.

    const notifications: Notification[] = [];

    for (const subscriberId of subscribers) {
      // Generate description by replacing placeholders in the template with actual data
      const description = template.template.replace(
        '${subscriberName}',
        `Subscriber ${subscriberId}`,
      );

      // Create a new notification entry with the generated description
      const notification = await this.notificationModel.create({
        title: type.name,
        description,
        // Other fields as needed
      });

      notifications.push(notification);
    }
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
