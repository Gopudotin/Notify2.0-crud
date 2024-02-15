// sub-notification.entity.ts

import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { Notification } from '../notification/notification.entity';
import { Subscriber } from '../subscribers/subscriber.entity';

@Table({ tableName: 'sub_notification' })
export class SubNotification extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => Notification)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  notification_id: number;

  @ForeignKey(() => Subscriber)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  subscriber_id: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    field: 'has_read',
  })
  has_read: boolean;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
    field: 'created_at',
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
    field: 'updated_at',
  })
  updatedAt: Date;
}
