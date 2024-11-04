import { SignInRequestDto } from '@auth/dtos/requests/sign-in-request.dto';
import { SignInResponseDto } from '@auth/dtos/responses/sign-in-response.dto';
import { Injectable } from '@nestjs/common';
import { AccessTokenPayloadDto } from '@token/dtos/internals/access-token-payload.dto';
import { AuthTokensDto } from '@token/dtos/internals/auth-tokens-dto';
import { RefreshTokenPayloadDto } from '@token/dtos/internals/refresh-token-payload.dto';
import { TokenService } from '@token/services/token.service';
import { UserProfileResponseDto } from '@users/dtos/responses/user-profile.response.dto';
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

    const user: UserProfileResponseDto = await this.usersService.verifyUser(email, password);

    const tokens: AuthTokensDto = await this.signInToken(user);

    return plainToInstance(SignInResponseDto, { ...user, ...tokens });
  }

  private async signInToken(user: UserProfileResponseDto): Promise<AuthTokensDto> {
    const accessTokenPayload: AccessTokenPayloadDto = plainToInstance(AccessTokenPayloadDto, user);

    const refreshTokenPayload: RefreshTokenPayloadDto = plainToInstance(
      RefreshTokenPayloadDto,
      user,
    );

    return await this.tokenService.generateTokens(accessTokenPayload, refreshTokenPayload);
  }
}
