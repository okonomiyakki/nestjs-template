import { BaseDto } from '@common/dtos/base.dto';
import { IUser } from '@users/interfaces/user.interface';
import { Expose } from 'class-transformer';

export class UserDto extends BaseDto implements IUser {
  @Expose()
  readonly email!: string;

  @Expose()
  readonly nickname!: string;

  @Expose()
  readonly password!: string;
}
