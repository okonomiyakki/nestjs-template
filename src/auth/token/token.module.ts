import { TokenRepository } from '@core/type-orm/repositories/token.repository';
import { TypeOrmExModule } from '@core/type-orm/type-orm-ex.module';
import { Module } from '@nestjs/common';
import { TokenService } from '@token/services/token.service';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([TokenRepository])],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
