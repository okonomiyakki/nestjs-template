import { AuthTokensDto } from '@token/dtos/internals/auth-tokens-dto';
import { UserProfileDto } from '@users/dtos/internals/user-profile.dto';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class SignInResponseDto {
  @Expose()
  readonly userProfile!: UserProfileDto;

  @Expose()
  readonly authToken!: Pick<AuthTokensDto, 'accessToken'>;
}
