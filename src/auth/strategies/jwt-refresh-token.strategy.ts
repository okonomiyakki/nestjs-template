import { AuthPayloadDto } from '@auth/dtos/internals/auth-payload.dto';
import jwtConfig from '@core/config/jwt.config';
import { Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { TokenService } from '@token/services/token.service';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    private readonly tokenService: TokenService,
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

    await this.tokenService.verifyRefreshToken(userId, refreshToken);

    return payload;
  }
}
