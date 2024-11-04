import { IAuthTokens } from '@token/interfaces/auth-tokens.interface';
import { UserProfileResponseDto } from '@users/dtos/responses/user-profile.response.dto';
import { Expose } from 'class-transformer';

export class SignInResponseDto extends UserProfileResponseDto implements IAuthTokens {
  @Expose()
  readonly accessToken!: string;

  @Expose()
  readonly refreshToken!: string;
}
