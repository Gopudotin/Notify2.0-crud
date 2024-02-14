// sub-notification.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SubNotificationController } from './controllers/sub-notification/sub-notification.controller';
import { SubNotification } from './sub-notification.entity';
import { SubNotificationService } from './services/sub-notification/sub-notification.service';

@Module({
  imports: [SequelizeModule.forFeature([SubNotification])],
  controllers: [SubNotificationController],
  providers: [SubNotificationService],
})
export class SubNotificationModule {}
