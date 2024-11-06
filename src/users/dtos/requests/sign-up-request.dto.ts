import {
  USER_EMAIL_LENGTH,
  USER_NICKNAME_LENGTH,
  USER_PASSWORD_REGEXP,
} from '@users/constants/user.constant';
import { IsEmail, IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class SignUpRequestDto {
  @IsNotEmpty()
  @IsEmail()
  @Length(USER_EMAIL_LENGTH.MIN, USER_EMAIL_LENGTH.MAX)
  readonly email!: string;

  @IsNotEmpty()
  @IsString()
  @Matches(USER_PASSWORD_REGEXP)
  readonly password!: string;

  @IsNotEmpty()
  @IsString()
  @Length(USER_NICKNAME_LENGTH.MIN, USER_NICKNAME_LENGTH.MAX)
  readonly nickname!: string;
}
