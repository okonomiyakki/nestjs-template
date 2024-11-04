import jwtConfig from '@core/config/jwt.config';
import { Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { AccessTokenPayloadDto } from '@token/dtos/internals/access-token-payload.dto';
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
  async validate(payload: AccessTokenPayloadDto): Promise<AccessTokenPayloadDto> {
    const { id: userId } = payload;

    await this.usersService.validateUser(userId);

    return payload;
  }
}
