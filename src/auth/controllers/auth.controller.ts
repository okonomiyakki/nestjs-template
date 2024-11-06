import { SignInRequestDto } from '@auth/dtos/requests/sign-in-request.dto';
import { RefreshResponseDto } from '@auth/dtos/responses/refresh-response.dto';
import { SignInResponseDto } from '@auth/dtos/responses/sign-in-response.dto';
import { JwtAccessTokenGuard } from '@auth/guards/jwt-access-token.guard';
import { JwtRefreshTokenGuard } from '@auth/guards/jwt-refresh-token.guard';
import { RolesGuard } from '@auth/guards/roles.guard';
import { AuthService } from '@auth/services/auth.service';
import { Role } from '@common/constants/roles.enum';
import { Roles } from '@common/decorators/roles.decorator';
import { User } from '@common/decorators/user.decorator';
import serverConfig from '@core/config/server.config';
import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import {
  ApiBearerAuth,
  ApiCookieAuth,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { PayloadDto } from '@token/dtos/payload.dto';
import { Response } from 'express';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject(serverConfig.KEY) private readonly config: ConfigType<typeof serverConfig>,
  ) {}

  @ApiOperation({ summary: 'Sign-in user' })
  @ApiOkResponse({ type: SignInResponseDto })
  @HttpCode(HttpStatus.OK)
  @Post('v1/signin')
  async signIn(
    @Body() signInRequest: SignInRequestDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<SignInResponseDto> {
    const { signInResponse, refreshToken } = await this.authService.signInUser(signInRequest);

    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: this.config.node.env === 'prod',
      maxAge: this.config.server.refreshTokenCookieMaxAge,
    });

    return signInResponse;
  }

  @ApiOperation({ summary: 'Sign-out user' })
  @ApiNoContentResponse({ description: 'No content' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAccessTokenGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('v1/signout')
  async signOut(
    @User() payload: PayloadDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    await this.authService.signOutUser(payload);

    response.clearCookie('refreshToken');
  }

  @ApiOperation({ summary: 'Refresh access-token' })
  @ApiOkResponse({ type: RefreshResponseDto })
  @ApiCookieAuth('refresh-token')
  @UseGuards(JwtRefreshTokenGuard, RolesGuard) // ⚠ This Must Be Changed
  @Roles(Role.GUEST, Role.MEMBER, Role.ADMIN) // ⚠ This Must Be Deleted
  @HttpCode(HttpStatus.OK)
  @Post('v1/refresh')
  async refresh(@User() payload: PayloadDto): Promise<RefreshResponseDto> {
    return await this.authService.refreshUser(payload);
  }
}
