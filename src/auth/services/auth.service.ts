import { SignInRequestDto } from '@auth/dtos/requests/sign-in-request.dto';
import { SignInResponseDto } from '@auth/dtos/responses/sign-in-response.dto';
import { Injectable } from '@nestjs/common';
import { AccessTokenPayloadDto } from '@token/dtos/internals/access-token-payload.dto';
import { AuthTokensDto } from '@token/dtos/internals/auth-tokens-dto';
import { RefreshTokenPayloadDto } from '@token/dtos/internals/refresh-token-payload.dto';
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

  async signInUser(signInRequest: SignInRequestDto): Promise<SignInResponseDto> {
    const { email, password } = signInRequest;

    const userProfile: UserProfileDto = await this.usersService.verifyUser(email, password);

    const tokens: AuthTokensDto = await this.signInToken(userProfile);

    return plainToInstance(SignInResponseDto, { ...userProfile, ...tokens });
  }

  private async signInToken(userProfile: UserProfileDto): Promise<AuthTokensDto> {
    const accessTokenPayload: AccessTokenPayloadDto = plainToInstance(
      AccessTokenPayloadDto,
      userProfile,
    );

    const refreshTokenPayload: RefreshTokenPayloadDto = plainToInstance(
      RefreshTokenPayloadDto,
      userProfile,
    );

    return await this.tokenService.generateTokens(accessTokenPayload, refreshTokenPayload);
  }
}
