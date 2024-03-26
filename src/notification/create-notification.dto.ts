// create-notification.dto.ts

import { IsArray, IsNotEmpty, IsNumber } from '@nestjs/class-validator';
export class CreateNotificationDto {
  @IsNumber()
  @IsNotEmpty()
  readonly type_id: number;

  @IsNumber()
  @IsNotEmpty()
  readonly template_id: number;

  @IsArray()
  @IsNumber({}, { each: true })
  @IsNotEmpty()
  readonly subscribers: number[];

  readonly scheduledTime?: Date;
}
