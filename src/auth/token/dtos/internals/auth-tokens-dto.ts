import { IAuthTokens } from '@token/interfaces/auth-tokens.interface';
import { Expose } from 'class-transformer';

export class AuthTokensDto implements IAuthTokens {
  @Expose()
  readonly accessToken!: string;

  @Expose()
  readonly refreshToken!: string;
}
