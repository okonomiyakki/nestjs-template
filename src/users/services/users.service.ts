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
import { UserDto } from '@users/dtos/internals/user.dto';
import { SignUpRequestDto } from '@users/dtos/requests/sign-up-request.dto';
import { SignUpResponseDto } from '@users/dtos/responses/sign-up-response.dto';
import { UserProfileDto } from '@users/dtos/internals/user-profile.dto';
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

  async verifyUser(email: string, password: string): Promise<UserProfileDto> {
    const user: UserDto | null = await this.userRepository.findUserByEmail(email);

    if (!user) throw new NotFoundException('Account does not exist.');

    const { password: hashedPassword } = user;

    const isPasswordMatched = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordMatched) throw new UnauthorizedException('Incorrect password.');

    return plainToInstance(UserProfileDto, user);
  }

  async validateUser(userId: string): Promise<void> {
    const user: UserDto | null = await this.userRepository.findUserById(userId);

    if (!user) throw new UnauthorizedException('Invalid payload.');
  }

  private async createUser(signUpRequest: SignUpRequestDto): Promise<UserProfileDto> {
    const { password } = signUpRequest;

    const hashedPassword = await bcrypt.hash(password, this.config.bcrypt.passwordSalt);

    const createUser: CreateUserDto = plainToInstance(CreateUserDto, {
      ...signUpRequest,
      password: hashedPassword,
    });

    const user: UserDto = await this.userRepository.saveUser(createUser);

    return plainToInstance(UserProfileDto, user);
  }

  private async checkUserEmailExists(email: string): Promise<void> {
    const user: UserDto | null = await this.userRepository.findUserByEmail(email);

    if (user?.email)
      throw new ConflictException('This email is already registered with an existing account.');
  }

  private async checkUserNicknameExists(nickname: string): Promise<void> {
    const user: UserDto | null = await this.userRepository.findUserByNickname(nickname);

    if (user?.nickname) throw new ConflictException('This nickname is already taken.');
  }
}
