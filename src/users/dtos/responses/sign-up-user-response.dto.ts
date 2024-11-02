import { BaseDto } from '@common/dtos/base.dto';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class SignUpUserResponseDto extends BaseDto {
  @Expose()
  readonly email!: string;

  @Expose()
  readonly nickname!: string;
}
