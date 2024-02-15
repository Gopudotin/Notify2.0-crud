// type.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { NotificationType } from 'src/type/type.entity';
import { NotificationTypeService } from 'src/type/services/type/type.service';

@Controller('type')
export class NotificationTypeController {
  constructor(private readonly typeService: NotificationTypeService) {}

  @Get()
  findAll(): Promise<NotificationType[]> {
    return this.typeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<NotificationType> {
    return this.typeService.findOne(+id);
  }

  @Post()
  create(
    @Body() typeData: Partial<NotificationType>,
  ): Promise<NotificationType> {
    return this.typeService.create(typeData);
  }

  @Put(':id')
  updateType(
    @Param('id') id: number,
    @Body() updatedData: Partial<NotificationType>,
  ): Promise<[number, NotificationType[]]> {
    return this.typeService.update(id, updatedData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.typeService.remove(+id);
  }
}
