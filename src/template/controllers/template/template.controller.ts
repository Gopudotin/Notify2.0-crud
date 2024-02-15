// template.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { NotificationTemplate } from 'src/template/template.entity';
import { NotificationTemplateService } from 'src/template/services/template/template.service';

@Controller('template')
export class NotificationTemplateController {
  constructor(private readonly templateService: NotificationTemplateService) {}

  @Get()
  findAll(): Promise<NotificationTemplate[]> {
    return this.templateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<NotificationTemplate> {
    return this.templateService.findOne(+id);
  }

  @Post()
  create(
    @Body() templateData: Partial<NotificationTemplate>,
  ): Promise<NotificationTemplate> {
    return this.templateService.create(templateData);
  }

  @Put(':id')
  updateTemplate(
    @Param('id') id: number,
    @Body() updatedData: Partial<NotificationTemplate>,
  ): Promise<[number, NotificationTemplate[]]> {
    return this.templateService.update(id, updatedData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.templateService.remove(+id);
  }
}
