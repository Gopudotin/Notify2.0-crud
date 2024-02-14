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
import { TemplateService } from 'src/template/services/template/template.service';
import { NotificationTemplate } from 'src/template/template.entity';

@Controller('template')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

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
  ): Promise<NotificationTemplate> {
    return this.templateService.update(id, updatedData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.templateService.remove(+id);
  }
}
