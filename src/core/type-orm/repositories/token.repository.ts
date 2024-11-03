import { CustomRepository } from '@core/type-orm/decorators/custom-repository.decorator';
import { TokenEntity } from '@core/type-orm/entities/token.entity';
import { Repository } from 'typeorm';

@CustomRepository(TokenEntity)
export class TokenRepository extends Repository<TokenEntity> {}
