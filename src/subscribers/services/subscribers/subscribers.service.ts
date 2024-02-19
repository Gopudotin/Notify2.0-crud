import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Subscriber } from 'src/subscribers/subscriber.entity';
import { SubNotification } from 'src/sub-notification/sub-notification.entity';
import { Notification } from 'src/notification/notification.entity';

@Injectable()
export class SubscriberService {
  constructor(
    @InjectModel(Subscriber)
    private readonly subscriberModel: typeof Subscriber,
    @InjectModel(SubNotification)
    private readonly subNotificationModel: typeof SubNotification,
  ) {}

  async findAll(): Promise<Subscriber[]> {
    return this.subscriberModel.findAll();
  }

  async findOne(id: number): Promise<Subscriber> {
    return this.subscriberModel.findByPk(id);
  }

  async findByIds(ids: number[]): Promise<Subscriber[]> {
    return this.subscriberModel.findAll({
      where: { id: ids }, // Find all subscribers where id is in the provided array of ids
    });
  }

  async create(subscriberData: Partial<Subscriber>): Promise<Subscriber> {
    return this.subscriberModel.create(subscriberData);
  }

  async update(
    id: number,
    subscriberData: Partial<Subscriber>,
  ): Promise<[number, Subscriber[]]> {
    const [affectedCount, updatedSubscribers] =
      await this.subscriberModel.update(subscriberData, {
        where: { id },
        returning: true,
      });

    return [affectedCount, updatedSubscribers];
  }

  async getSubscriberNotifications(
    subscriberId: number,
  ): Promise<SubNotification[]> {
    return this.subNotificationModel.findAll({
      where: { subscriber_id: subscriberId },
      include: [{ model: Subscriber }],
    });
  }

  async findNotificationsBySubscriberId(
    subscriberId: number,
  ): Promise<SubNotification[]> {
    return this.subNotificationModel.findAll({
      where: { subscriber_id: subscriberId },
      include: [Notification],
    });
  }

  async remove(id: number): Promise<void> {
    await this.subscriberModel.destroy({ where: { id } });
  }
}
