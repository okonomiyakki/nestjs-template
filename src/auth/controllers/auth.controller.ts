import { SignInRequestDto } from '@auth/dtos/requests/sign-in-request.dto';
import { SignInResponseDto } from '@auth/dtos/responses/sign-in-response.dto';
import { AuthService } from '@auth/services/auth.service';
import serverConfig from '@core/config/server.config';
import { Body, Controller, HttpCode, HttpStatus, Inject, Post, Res } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject(serverConfig.KEY) private readonly config: ConfigType<typeof serverConfig>,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('v1/signin')
  async signIn(
    @Body() signInRequest: SignInRequestDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<Omit<SignInResponseDto, 'refreshToken'>> {
    const { refreshToken, ...signInResponse }: SignInResponseDto =
      await this.authService.signInUser(signInRequest);

    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: this.config.node.env === 'prod',
      maxAge: this.config.server.refreshTokenCookieMaxAge,
    });

    return signInResponse;
  }
}
