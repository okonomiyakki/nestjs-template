import { IAuthPayload } from '@auth/interfaces/auth-payload.interface';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class AuthPayloadDto implements IAuthPayload {
  @Expose()
  readonly userId!: string;
}
