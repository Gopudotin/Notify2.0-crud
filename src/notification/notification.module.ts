import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { NotificationController } from './controllers/notification/notification.controller';
import { Notification } from './notification.entity';
import { NotificationService } from './services/notification/notification.service';
import { NotificationTemplate } from 'src/template/template.entity';
import { NotificationType } from 'src/type/type.entity';
import { SubscriberService } from 'src/subscribers/services/subscribers/subscribers.service';
import { Subscriber } from 'src/subscribers/subscriber.entity';
import { SubNotification } from 'src/sub-notification/sub-notification.entity';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Notification,
      NotificationTemplate,
      NotificationType,
      Subscriber,
      SubNotification,
    ]),
    BullModule.registerQueue({
      name: 'scheduleQueue',
    }),
  ],
  controllers: [NotificationController],
  providers: [
    NotificationService,
    NotificationTemplate,
    NotificationType,
    SubscriberService,
    SubNotification,
  ],
  exports: [NotificationService],
})
export class NotificationModule {}
