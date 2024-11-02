import { CustomRepository } from '@core/type-orm/decorators/custom-repository.decorator';
import { UserEntity } from '@core/type-orm/entities/user.entity';
import { Repository } from 'typeorm';

@CustomRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async findOneByEmailOrNull(email: string): Promise<UserEntity | null> {
    const userEntity = await this.findOne({ where: { email } });

    return userEntity || null;
  }

  async findOneByNicknameOrNull(nickname: string): Promise<UserEntity | null> {
    const userEntity = await this.findOne({ where: { nickname } });

    return userEntity || null;
  }
}
