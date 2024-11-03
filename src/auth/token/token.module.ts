import { Module } from '@nestjs/common';
import { TokenService } from '@token/services/token.service';

@Module({
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
