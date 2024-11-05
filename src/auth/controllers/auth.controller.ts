import { AuthPayloadDto } from '@auth/dtos/internals/auth-payload.dto';
import { SignInRequestDto } from '@auth/dtos/requests/sign-in-request.dto';
import { RefreshResponseDto } from '@auth/dtos/responses/refresh-response.dto';
import { SignInResponseDto } from '@auth/dtos/responses/sign-in-response.dto';
import { JwtAccessTokenGuard } from '@auth/guards/jwt-access-token.guard';
import { JwtRefreshTokenGuard } from '@auth/guards/jwt-refresh-token.guard';
import { AuthService } from '@auth/services/auth.service';
import { User } from '@common/decorators/user.decorator';
import serverConfig from '@core/config/server.config';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
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
  ): Promise<SignInResponseDto> {
    const { responseBody, responseCookie } = await this.authService.signInUser(signInRequest);

    response.cookie('refreshToken', responseCookie, {
      httpOnly: true,
      secure: this.config.node.env === 'prod',
      maxAge: this.config.server.refreshTokenCookieMaxAge,
    });

    return responseBody;
  }

  @UseGuards(JwtAccessTokenGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('v1/signout')
  async signOut(@User() authPayload: AuthPayloadDto, @Res() response: Response): Promise<void> {
    await this.authService.signOutUser(authPayload);

    response.clearCookie('refreshToken');
  }

  @UseGuards(JwtRefreshTokenGuard)
  @HttpCode(HttpStatus.OK)
  @Post('v1/refresh')
  async refresh(@User() authPayload: AuthPayloadDto): Promise<RefreshResponseDto> {
    return await this.authService.refreshUser(authPayload);
  }
}
