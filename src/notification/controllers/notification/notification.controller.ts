// notification.controller.ts

import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { Notification } from 'src/notification/notification.entity';
import { NotificationService } from 'src/notification/services/notification/notification.service';
import { CreateNotificationDto } from 'src/notification/create-notification.dto';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  // Create notification for multiple subscribers
  @Post()
  async create(
    @Body() createNotificationDto: CreateNotificationDto,
  ): Promise<Notification[]> {
    return this.notificationService.create(createNotificationDto);
  }

  @Get()
  findAll(): Promise<Notification[]> {
    return this.notificationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Notification> {
    return this.notificationService.findOne(+id);
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
