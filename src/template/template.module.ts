// template.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { NotificationTemplateController } from './controllers/template/template.controller';
import { NotificationTemplate } from './template.entity';
import { NotificationTemplateService } from './services/template/template.service';

@Module({
  imports: [SequelizeModule.forFeature([NotificationTemplate])],
  controllers: [NotificationTemplateController],
  providers: [NotificationTemplateService],
})
export class TemplateModule {}
