import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SubscriberController } from './controller/subscribers/subscribers.controller';
import { Subscriber } from './subscriber.entity';
import { SubscriberService } from './services/subscribers/subscribers.service';
import { SubNotification } from 'src/sub-notification/sub-notification.entity';
@Module({
  imports: [SequelizeModule.forFeature([Subscriber, SubNotification])],
  controllers: [SubscriberController],
  providers: [SubscriberService],
})
export class SubscriberModule {}
