// notification.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { Notification } from 'src/notification/notification.entity';
import { NotificationService } from 'src/notification/services/notification/notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  findAll(): Promise<Notification[]> {
    return this.notificationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Notification> {
    return this.notificationService.findOne(+id);
  }

  @Post()
  create(
    @Body() notificationData: Partial<Notification>,
  ): Promise<Notification> {
    return this.notificationService.create(notificationData);
  }

  @Put(':id')
  updateNotification(
    @Param('id') id: number,
    @Body() updatedData: Partial<Notification>,
  ): Promise<Notification> {
    return this.notificationService.update(id, updatedData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.notificationService.remove(+id);
  }
}
