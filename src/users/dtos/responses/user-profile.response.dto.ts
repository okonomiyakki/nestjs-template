import { BaseDto } from '@common/dtos/base.dto';
import { IUser } from '@users/interfaces/user.interface';
import { Expose } from 'class-transformer';

export class UserProfileResponseDto extends BaseDto implements Pick<IUser, 'email' | 'nickname'> {
  @Expose()
  readonly email!: string;

  @Expose()
  readonly nickname!: string;
}
