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
    const { email, nickname } = signUpUserRequest;

    await this.checkUserEmailExists(email);

    await this.checkUserNicknameExists(nickname);

    return await this.createUser(signUpUserRequest);
  }

  private async createUser(
    signUpUserRequest: SignUpUserRequestDto,
  ): Promise<SignUpUserResponseDto> {
    const { password } = signUpUserRequest;

    const hashedPassword = await bcrypt.hash(password, this.config.bcrypt.passwordSalt);

    const createUser: CreateUserDto = plainToInstance(CreateUserDto, {
      ...signUpUserRequest,
      password: hashedPassword,
    });

    const userEntity = await this.userRepository.saveUser(createUser);

    return plainToInstance(SignUpUserResponseDto, userEntity);
  }

  private async checkUserEmailExists(email: string): Promise<void> {
    const userEntity = await this.userRepository.findUserByEmail(email);

    if (userEntity?.email)
      throw new ConflictException('This email is already registered with an existing account.');
  }

  private async checkUserNicknameExists(nickname: string): Promise<void> {
    const userEntity = await this.userRepository.findUserByNickname(nickname);

    if (userEntity?.nickname) throw new ConflictException('This nickname is already taken.');
  }
}
