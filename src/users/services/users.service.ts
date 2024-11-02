import bcryptConfig from '@core/config/bcrypt.config';
import { UserRepository } from '@core/type-orm/repositories/user.repository';
import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { CreateUserDto } from '@users/dtos/internals/create-user.dto';
import { SignUpUserRequestDto } from '@users/dtos/requests/sign-up-user-request.dto';
import { SignUpUserResponseDto } from '@users/dtos/responses/sign-up-user-response.dto';
import bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    @Inject(bcryptConfig.KEY) private readonly config: ConfigType<typeof bcryptConfig>,
  ) {}

  async signUpUser(signUpUserRequest: SignUpUserRequestDto): Promise<SignUpUserResponseDto> {
    const { email, password, nickname } = signUpUserRequest;

    await this.findUserByEmailOrThrow(email);

    await this.findUserByNicknameOrThrow(nickname);

    const hashedPassword = await bcrypt.hash(password, this.config.bcrypt.passwordSalt);

    const createUser: CreateUserDto = plainToInstance(CreateUserDto, {
      email,
      password: hashedPassword,
      nickname,
    });

    const userEntity = await this.userRepository.save(createUser);

    return plainToInstance(SignUpUserResponseDto, userEntity);
  }

  private async findUserByEmailOrThrow(email: string): Promise<void> {
    const userEntity = await this.userRepository.findOneByEmailOrNull(email);

    if (userEntity?.email) throw new ConflictException('이미 사용중인 이메일 입니다.');
  }

  private async findUserByNicknameOrThrow(nickname: string): Promise<void> {
    const userEntity = await this.userRepository.findOneByNicknameOrNull(nickname);

    if (userEntity?.nickname) throw new ConflictException('이미 사용중인 닉네임 입니다.');
  }
}
