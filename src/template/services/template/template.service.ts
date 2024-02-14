// template.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { NotificationTemplate } from 'src/template/template.entity';

@Injectable()
export class TemplateService {
  constructor(
    @InjectModel(NotificationTemplate)
    private readonly templateModel: typeof NotificationTemplate,
  ) {}

  async findAll(): Promise<NotificationTemplate[]> {
    return this.templateModel.findAll();
  }

  async findOne(id: number): Promise<NotificationTemplate> {
    return this.templateModel.findByPk(id);
  }

  async create(
    templateData: Partial<NotificationTemplate>,
  ): Promise<NotificationTemplate> {
    return this.templateModel.create(templateData);
  }

  async update(
    id: number,
    templateData: Partial<NotificationTemplate>,
  ): Promise<NotificationTemplate> {
    await this.templateModel.update(templateData, { where: { id } });
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.templateModel.destroy({ where: { id } });
  }
}
