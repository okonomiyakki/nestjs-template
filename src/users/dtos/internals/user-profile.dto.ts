import { Role } from '@common/constants/roles.enum';
import { BaseDto } from '@common/dtos/base.dto';
import { IUserProfile } from '@users/interfaces/user.profile.interface';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserProfileDto extends BaseDto implements IUserProfile {
  @Expose()
  readonly email!: string;

  @Expose()
  readonly nickname!: string;

  @Expose()
  readonly role!: Role;
}
