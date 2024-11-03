import { IUser } from '@users/interfaces/user.interface';

export class SignUpRequestDto implements IUser {
  readonly email!: string;

  readonly password!: string;

  readonly nickname!: string;
}
