import { IAuthPayload } from '@auth/interfaces/auth-payload.interface';
import { Expose } from 'class-transformer';

export class AuthPayloadDto implements IAuthPayload {
  @Expose()
  readonly userId!: string;
}