import { SignInRequestDto } from '@auth/dtos/requests/sign-in-request.dto';
import { Injectable } from '@nestjs/common';
import { UserProfileResponseDto } from '@users/dtos/responses/user-profile.response.dto';
import { UsersService } from '@users/services/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signInUser(signInRequest: SignInRequestDto): Promise<any> {
    const { email, password } = signInRequest;

    const user: UserProfileResponseDto = await this.usersService.verifyUser(email, password);

    // TODO: JWT 발급 로직 구현
  }
}
