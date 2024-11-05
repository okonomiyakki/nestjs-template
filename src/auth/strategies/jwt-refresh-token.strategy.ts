import { AuthPayloadDto } from '@auth/dtos/internals/auth-payload.dto';
import jwtConfig from '@core/config/jwt.config';
import { Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { TokenService } from '@token/services/token.service';
import { UserProfileDto } from '@users/dtos/internals/user-profile.dto';
import { UsersService } from '@users/services/users.service';
import { plainToInstance } from 'class-transformer';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    private readonly tokenService: TokenService,
    private readonly usersService: UsersService,
    @Inject(jwtConfig.KEY) private readonly config: ConfigType<typeof jwtConfig>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request) => request?.cookies?.refreshToken]),
      ignoreExpiration: false,
      secretOrKey: config.jwt.refreshToken.secret,
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: AuthPayloadDto): Promise<AuthPayloadDto> {
    const { refreshToken } = request.cookies;

    const { userId } = payload;

    const id = await this.tokenService.verifyRefreshToken(userId, refreshToken);

    const userProfile: UserProfileDto = await this.usersService.getUserProfileById(id);

    return plainToInstance(AuthPayloadDto, {
      ...userProfile,
      userId: userProfile.id,
    });
  }
}
