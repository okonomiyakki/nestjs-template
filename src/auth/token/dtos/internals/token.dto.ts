import { BaseDto } from '@common/dtos/base.dto';
import { IToken } from '@token/interfaces/token.interface';
import { Expose } from 'class-transformer';

export class TokenDto extends BaseDto implements IToken {
  @Expose()
  readonly userId!: string;

  @Expose()
  readonly refreshToken!: string;
}
