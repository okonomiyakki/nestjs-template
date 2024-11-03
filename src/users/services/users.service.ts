import bcryptConfig from '@core/config/bcrypt.config';
import { UserRepository } from '@core/type-orm/repositories/user.repository';
import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { CreateUserDto } from '@users/dtos/internals/create-user.dto';
import { UserProfileDto } from '@users/dtos/internals/user-profile.dto';
import { SignUpRequestDto } from '@users/dtos/requests/sign-up-request.dto';
import { SignUpResponseDto } from '@users/dtos/responses/sign-up-response.dto';
import { UserProfileResponseDto } from '@users/dtos/responses/user-profile.response.dto';
import bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    @Inject(bcryptConfig.KEY) private readonly config: ConfigType<typeof bcryptConfig>,
  ) {}

  async signUpUser(signUpRequest: SignUpRequestDto): Promise<SignUpResponseDto> {
    const { email, nickname } = signUpRequest;

    await this.checkUserEmailExists(email);

    await this.checkUserNicknameExists(nickname);

    return await this.createUser(signUpRequest);
  }

  async verifyUser(email: string, password: string): Promise<UserProfileResponseDto> {
    const userEntity = await this.userRepository.findUserByEmail(email);

    if (!userEntity) throw new NotFoundException('Account does not exist.');

    const { password: hashedPassword } = userEntity;

    const isPasswordMatched = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordMatched) throw new UnauthorizedException('Incorrect password.');

    return plainToInstance(UserProfileResponseDto, userEntity);
  }

  private async createUser(signUpRequest: SignUpRequestDto): Promise<UserProfileResponseDto> {
    const { password } = signUpRequest;

    const hashedPassword = await bcrypt.hash(password, this.config.bcrypt.passwordSalt);

    const createUser: CreateUserDto = plainToInstance(CreateUserDto, {
      ...signUpRequest,
      password: hashedPassword,
    });

    const userEntity = await this.userRepository.saveUser(createUser);

    return plainToInstance(UserProfileResponseDto, userEntity);
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
