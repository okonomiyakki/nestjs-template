import { AuthPayloadDto } from '@auth/dtos/internals/auth-payload.dto';
import { SignInRequestDto } from '@auth/dtos/requests/sign-in-request.dto';
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

  async signInUser(signInRequest: SignInRequestDto): Promise<SignInResponseDto> {
    const { email, password } = signInRequest;

    const userProfile: UserProfileDto = await this.usersService.verifyUser(email, password);

    const tokens: AuthTokensDto = await this.signInToken(userProfile);

    return plainToInstance(SignInResponseDto, { ...userProfile, ...tokens });
  }

  private async signInToken(userProfile: UserProfileDto): Promise<AuthTokensDto> {
    const authPayload: AuthPayloadDto = plainToInstance(AuthPayloadDto, userProfile);

    const { userId } = authPayload;

    return await this.tokenService.generateTokens(userId);
  }
}
