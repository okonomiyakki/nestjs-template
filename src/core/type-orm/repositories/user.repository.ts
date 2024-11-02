import { CustomRepository } from '@core/type-orm/decorators/custom-repository.decorator';
import { UserEntity } from '@core/type-orm/entities/user.entity';
import { Repository } from 'typeorm';

@CustomRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {}
