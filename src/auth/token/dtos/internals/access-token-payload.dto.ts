import { IBase } from '@common/interfaces/base.interface';
import { IUser } from '@users/interfaces/user.interface';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class AccessTokenPayloadDto implements Pick<IBase, 'id'>, Pick<IUser, 'email' | 'nickname'> {
  @Expose()
  readonly id!: string;

  @Expose()
  readonly email!: string;

  @Expose()
  readonly nickname!: string;
}
