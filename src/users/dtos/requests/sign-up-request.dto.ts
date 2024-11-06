import { ApiProperty } from '@nestjs/swagger';
import {
  USER_EMAIL_LENGTH,
  USER_NICKNAME_LENGTH,
  USER_PASSWORD_REGEXP,
} from '@users/constants/user.constant';
import { IsEmail, IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class SignUpRequestDto {
  @ApiProperty({
    description: 'User Email',
    type: String,
    example: 'example@eamil.com',
  })
  @IsNotEmpty()
  @IsEmail()
  @Length(USER_EMAIL_LENGTH.MIN, USER_EMAIL_LENGTH.MAX)
  readonly email!: string;

  @ApiProperty({
    description: 'User Password',
    type: String,
    example: 'examplepw123*',
  })
  @IsNotEmpty()
  @IsString()
  @Matches(USER_PASSWORD_REGEXP)
  readonly password!: string;

  @ApiProperty({
    description: 'User Nickname',
    type: String,
    example: 'example',
  })
  @IsNotEmpty()
  @IsString()
  @Length(USER_NICKNAME_LENGTH.MIN, USER_NICKNAME_LENGTH.MAX)
  readonly nickname!: string;
}
