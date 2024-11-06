import { IPayload } from '@token/interfaces/payload.interface';
import { Expose } from 'class-transformer';

export class AuthPayloadDto implements Pick<IPayload, 'id'> {
  @Expose()
  readonly id!: string;
}
