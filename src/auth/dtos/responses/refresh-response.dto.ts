import { IAuthTokens } from '@token/interfaces/auth-tokens.interface';
import { Expose } from 'class-transformer';

export class RefreshResponseDto implements Pick<IAuthTokens, 'accessToken'> {
  @Expose()
  accessToken!: string;
}
