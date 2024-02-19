// subscriber.entity.ts

import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { SubNotification } from '../sub-notification/sub-notification.entity';

@Table({ tableName: 'subscriber' })
export class Subscriber extends Model {
  @HasMany(() => SubNotification)
  subNotifications: SubNotification[]; // Corrected property name

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'external_userid',
  })
  externalUserId: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

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
