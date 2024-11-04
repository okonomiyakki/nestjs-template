import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RefreshTokenPayloadDto } from '@token/dtos/internals/refresh-token-payload.dto';
import { Observable } from 'rxjs';

@Injectable()
export class JwtRefreshTokenGuard extends AuthGuard('jwt-refresh') {
  handleRequest<TUser = RefreshTokenPayloadDto>(err: Error | null, user: TUser | null): TUser {
    if (err || !user) throw new UnauthorizedException('Invalid refresh token.');

    return user;
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }
}
