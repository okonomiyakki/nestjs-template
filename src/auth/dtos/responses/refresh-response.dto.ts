import { IAuthTokens } from '@token/interfaces/auth-tokens.interface';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class RefreshResponseDto implements Pick<IAuthTokens, 'accessToken'> {
  @Expose()
  accessToken!: string;
}
