// sub-notification.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { SubNotification } from 'src/sub-notification/sub-notification.entity';
import { SubNotificationService } from 'src/sub-notification/services/sub-notification/sub-notification.service';

@Controller('sub-notification')
export class SubNotificationController {
  constructor(
    private readonly subNotificationService: SubNotificationService,
  ) {}

  @Get()
  findAll(): Promise<SubNotification[]> {
    return this.subNotificationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<SubNotification> {
    return this.subNotificationService.findOne(+id);
  }

  @Post()
  create(
    @Body() subNotificationData: Partial<SubNotification>,
  ): Promise<SubNotification> {
    return this.subNotificationService.create(subNotificationData);
  }

  @Put(':id')
  updateSubNotification(
    @Param('id') id: number,
    @Body() updatedData: Partial<SubNotification>,
  ): Promise<[number, SubNotification[]]> {
    return this.subNotificationService.update(id, updatedData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.subNotificationService.remove(+id);
  }
}
