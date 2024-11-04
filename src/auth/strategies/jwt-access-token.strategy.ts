import { AuthPayloadDto } from '@auth/dtos/internals/auth-payload.dto';
import jwtConfig from '@core/config/jwt.config';
import { Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { UsersService } from '@users/services/users.service';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtAccessTokenStrategy extends PassportStrategy(Strategy, 'jwt-access') {
  // 2. 토큰 검즘
  constructor(
    private readonly usersService: UsersService,
    @Inject(jwtConfig.KEY) private readonly config: ConfigType<typeof jwtConfig>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.jwt.accessToken.secret,
    });
  }

  // 3. payload 검증
  async validate(payload: AuthPayloadDto): Promise<AuthPayloadDto> {
    const { userId } = payload;

    await this.usersService.validateUser(userId);

    return payload;
  }
}
