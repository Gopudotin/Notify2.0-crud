// notification.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { NotificationController } from './controllers/notification/notification.controller';
import { Notification } from './notification.entity';
import { NotificationService } from './services/notification/notification.service';

@Module({
  imports: [SequelizeModule.forFeature([Notification])],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
