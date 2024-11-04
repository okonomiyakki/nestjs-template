import { BaseDto } from '@common/dtos/base.dto';
import { IUser } from '@users/interfaces/user.interface';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserProfileDto extends BaseDto implements Pick<IUser, 'email' | 'nickname'> {
  @Expose()
  readonly email!: string;

  @Expose()
  readonly nickname!: string;
}
