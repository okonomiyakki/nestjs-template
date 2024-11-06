import { UserProfileDto } from '@users/dtos/internals/user-profile.dto';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class SignUpResponseDto {
  @Expose()
  readonly userProfile!: UserProfileDto;
}
