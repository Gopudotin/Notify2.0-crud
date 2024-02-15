// type.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { NotificationTypeController } from './controllers/type/type.controller';
import { NotificationTypeService } from './services/type/type.service';
import { NotificationType } from './type.entity';

@Module({
  imports: [SequelizeModule.forFeature([NotificationType])],
  controllers: [NotificationTypeController],
  providers: [NotificationTypeService],
})
export class TypeModule {}
