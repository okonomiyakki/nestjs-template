import { BaseDto } from '@common/dtos/base.dto';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class SignUpResponseDto extends BaseDto {
  @Expose()
  readonly email!: string;

  @Expose()
  readonly nickname!: string;
}
