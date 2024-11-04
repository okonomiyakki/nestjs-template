import { AuthPayloadDto } from '@auth/dtos/internals/auth-payload.dto';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator((data: keyof AuthPayloadDto, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();

  return request.user[data] || request.user;
});
