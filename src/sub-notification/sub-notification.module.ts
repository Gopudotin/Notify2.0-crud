// sub-notification.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SubNotificationController } from './controllers/sub-notification/sub-notification.controller';
import { SubNotification } from './sub-notification.entity';
import { SubNotificationService } from './services/sub-notification/sub-notification.service';
import { Notification } from 'src/notification/notification.entity';

@Module({
  imports: [SequelizeModule.forFeature([SubNotification, Notification])],
  controllers: [SubNotificationController],
  providers: [SubNotificationService],
})
export class SubNotificationModule {}
