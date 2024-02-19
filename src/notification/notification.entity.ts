// notification.entity.ts

import { Table, Column, Model, DataType, HasOne } from 'sequelize-typescript';
import { SubNotification } from '../sub-notification/sub-notification.entity';

@Table({ tableName: 'notification' })
export class Notification extends Model {
  @HasOne(() => SubNotification)
  subNotification: SubNotification;

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

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
