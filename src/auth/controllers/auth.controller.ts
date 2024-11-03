import { SignInRequestDto } from '@auth/dtos/requests/sign-in-request.dto';
import { AuthService } from '@auth/services/auth.service';
import { Body, Controller } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async signIn(@Body() signInRequest: SignInRequestDto): Promise<any> {
    return await this.authService.signInUser(signInRequest);
  }
}
