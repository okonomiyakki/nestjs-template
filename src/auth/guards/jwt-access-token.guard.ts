import { AuthPayloadDto } from '@auth/dtos/internals/auth-payload.dto';
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAccessTokenGuard extends AuthGuard('jwt-access') {
  // 4. payload 반환
  handleRequest<TUser = AuthPayloadDto>(err: Error | null, user: TUser | null): TUser {
    if (err || !user) throw new UnauthorizedException('Invalid access token.');

    return user;
  }

  // 1. 요청 컨텍스트 실행
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }
}
