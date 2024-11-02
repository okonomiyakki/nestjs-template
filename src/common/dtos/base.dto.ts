import { Expose } from 'class-transformer';

export class BaseDto {
  @Expose()
  readonly id!: string;

  @Expose()
  readonly createdAt!: Date;
}
