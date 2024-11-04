import { CustomRepository } from '@core/type-orm/decorators/custom-repository.decorator';
import { TokenEntity } from '@core/type-orm/entities/token.entity';
import { InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';

@CustomRepository(TokenEntity)
export class TokenRepository extends Repository<TokenEntity> {
  async upsertToken(userId: string, refreshToken: string): Promise<void> {
    try {
      await this.upsert(
        {
          userId,
          refreshToken,
        },
        ['userId'],
      );
    } catch (error) {
      throw new InternalServerErrorException('Query failed.');
    }
  }
}
