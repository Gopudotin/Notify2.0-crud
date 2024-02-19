// subscriber.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { Subscriber } from 'src/subscribers/subscriber.entity';
import { SubscriberService } from 'src/subscribers/services/subscribers/subscribers.service';
import { SubNotification } from 'src/sub-notification/sub-notification.entity';

@Controller('subscriber')
export class SubscriberController {
  constructor(private readonly subscriberService: SubscriberService) {}

  @Get()
  findAll(): Promise<Subscriber[]> {
    return this.subscriberService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Subscriber> {
    return this.subscriberService.findOne(+id);
  }

  @Get(':id/notifications')
  async getSubscriberNotifications(
    @Param('id') id: string,
  ): Promise<SubNotification[]> {
    return this.subscriberService.findNotificationsBySubscriberId(+id);
  }

  @Post()
  create(@Body() subscriberData: Partial<Subscriber>): Promise<Subscriber> {
    return this.subscriberService.create(subscriberData);
  }

  @Put(':id')
  updateSubscriber(
    @Param('id') id: number,
    @Body() updatedData: Partial<Subscriber>,
  ): Promise<[number, Subscriber[]]> {
    return this.subscriberService.update(id, updatedData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.subscriberService.remove(+id);
  }
}
