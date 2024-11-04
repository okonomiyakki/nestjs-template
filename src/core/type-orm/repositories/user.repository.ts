import { CustomRepository } from '@core/type-orm/decorators/custom-repository.decorator';
import { UserEntity } from '@core/type-orm/entities/user.entity';
import { InternalServerErrorException } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';

@CustomRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async saveUser(createUser: DeepPartial<UserEntity>): Promise<UserEntity> {
    try {
      const userEntity = await this.save(createUser);

      return userEntity;
    } catch (error) {
      throw new InternalServerErrorException('Query failed.');
    }
  }

  async findUserByEmail(email: string): Promise<UserEntity | null> {
    try {
      const userEntity = await this.findOne({ where: { email } });

      return userEntity || null;
    } catch (error) {
      throw new InternalServerErrorException('Query failed.');
    }
  }

  async findUserByNickname(nickname: string): Promise<UserEntity | null> {
    try {
      const userEntity = await this.findOne({ where: { nickname } });

      return userEntity || null;
    } catch (error) {
      throw new InternalServerErrorException('Query failed.');
    }
  }

  async findUserById(id: string): Promise<UserEntity | null> {
    try {
      const userEntity = await this.findOne({ where: { id } });

      return userEntity || null;
    } catch (error) {
      throw new InternalServerErrorException('Query failed.');
    }
  }
}
