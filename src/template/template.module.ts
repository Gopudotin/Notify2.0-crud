// template.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TemplateController } from './controllers/template/template.controller';
import { NotificationTemplate } from './template.entity';
import { TemplateService } from './services/template/template.service';

@Module({
  imports: [SequelizeModule.forFeature([NotificationTemplate])],
  controllers: [TemplateController],
  providers: [TemplateService],
})
export class TemplateModule {}
