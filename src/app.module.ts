import { Module } from '@nestjs/common';
import { TypeModule } from './type/type.module';
import { TemplateModule } from './template/template.module';
import { SubscriberModule } from './subscribers/subscribers.module';
import { NotificationModule } from './notification/notification.module';
import { SubNotificationModule } from './sub-notification/sub-notification.module';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'hp15',
      database: 'lanware',
      autoLoadModels: true,
      synchronize: true,
    }),

    TypeModule,
    TemplateModule,
    SubscriberModule,
    NotificationModule,
    SubNotificationModule,
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
