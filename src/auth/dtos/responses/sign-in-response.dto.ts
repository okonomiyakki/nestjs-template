import { IAuthTokens } from '@token/interfaces/auth-tokens.interface';
import { UserProfileDto } from '@users/dtos/internals/user-profile.dto';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class SignInResponseDto extends UserProfileDto implements IAuthTokens {
  @Expose()
  readonly accessToken!: string;

  @Expose()
  readonly refreshToken!: string;
}
