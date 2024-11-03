import { IUser } from '@users/interfaces/user.interface';

export class SignInRequestDto implements Pick<IUser, 'email' | 'password'> {
  readonly email!: string;

  readonly password!: string;
}
