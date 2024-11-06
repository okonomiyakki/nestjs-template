import { PayloadDto } from '@token/dtos/payload.dto';
import { SignInRequestDto } from '@auth/dtos/requests/sign-in-request.dto';
import { RefreshResponseDto } from '@auth/dtos/responses/refresh-response.dto';
import { SignInResponseDto } from '@auth/dtos/responses/sign-in-response.dto';
import { Injectable } from '@nestjs/common';
import { AuthTokensDto } from '@token/dtos/internals/auth-tokens-dto';
import { TokenService } from '@token/services/token.service';
import { UserProfileDto } from '@users/dtos/internals/user-profile.dto';
import { UsersService } from '@users/services/users.service';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokenService: TokenService,
  ) {}

  async signInUser(
    signInRequest: SignInRequestDto,
  ): Promise<{ signInResponse: SignInResponseDto; refreshToken: string }> {
    const { email, password } = signInRequest;

    const userProfile: UserProfileDto = await this.usersService.verifyUser(email, password);

    const authTokens: AuthTokensDto = await this.signInToken(userProfile);

    const { accessToken, refreshToken } = authTokens;

    const signInResponse = plainToInstance(SignInResponseDto, { userProfile, accessToken });

    return { signInResponse, refreshToken };
  }

  async signOutUser(payload: PayloadDto): Promise<void> {
    const { id: userId } = payload;

    await this.tokenService.deleteRefreshToken(userId);
  }

  async refreshUser(payload: PayloadDto): Promise<RefreshResponseDto> {
    const { id, nickname, role } = payload;

    const accessToken = this.tokenService.generateAccessToken(id, nickname, role);

    return plainToInstance(RefreshResponseDto, { accessToken });
  }

  private async signInToken(userProfile: UserProfileDto): Promise<AuthTokensDto> {
    const payload: PayloadDto = plainToInstance(PayloadDto, userProfile);

    const { id, nickname, role } = payload;

    return await this.tokenService.generateTokens(id, nickname, role);
  }
}
