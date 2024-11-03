import { IBase } from '@common/interfaces/base.interface';
import { Expose } from 'class-transformer';

export class BaseDto implements IBase {
  @Expose()
  readonly id!: string;

  @Expose()
  readonly createdAt!: Date;
}
