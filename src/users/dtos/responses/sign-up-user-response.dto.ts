import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class SignUpUserResponseDto {
  @Expose()
  readonly id!: string;

  @Expose()
  readonly email!: string;

  @Expose()
  readonly nickname!: string;

  @Expose()
  readonly createdAt!: Date;
}
