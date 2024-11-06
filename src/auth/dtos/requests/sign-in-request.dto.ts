import { USER_EMAIL_LENGTH, USER_PASSWORD_REGEXP } from '@users/constants/user.constant';
import { IsEmail, IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class SignInRequestDto {
  @IsNotEmpty()
  @IsEmail()
  @Length(USER_EMAIL_LENGTH.MIN, USER_EMAIL_LENGTH.MAX)
  readonly email!: string;

  @IsNotEmpty()
  @IsString()
  @Matches(USER_PASSWORD_REGEXP)
  readonly password!: string;
}
