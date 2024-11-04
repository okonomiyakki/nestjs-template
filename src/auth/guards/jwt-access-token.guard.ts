import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AccessTokenPayloadDto } from '@token/dtos/internals/access-token-payload.dto';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAccessTokenGuard extends AuthGuard('jwt-access') {
  handleRequest<TUser = AccessTokenPayloadDto>(err: Error | null, user: TUser | null): TUser {
    // 4. payload 반환
    if (err || !user) throw new UnauthorizedException('Invalid access token.');

    return user;
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    // 1. 요청 컨텍스트 실행
    return super.canActivate(context);
  }
}
