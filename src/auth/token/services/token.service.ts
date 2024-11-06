import { Role } from '@common/constants/roles.enum';
import bcryptConfig from '@core/config/bcrypt.config';
import jwtConfig from '@core/config/jwt.config';
import { TokenRepository } from '@core/type-orm/repositories/token.repository';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthTokensDto } from '@token/dtos/internals/auth-tokens-dto';
import { TokenDto } from '@token/dtos/internals/token.dto';
import bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly tokenRepository: TokenRepository,
    @Inject(jwtConfig.KEY) private readonly config: ConfigType<typeof jwtConfig>,
    @Inject(bcryptConfig.KEY) private readonly hashConfig: ConfigType<typeof bcryptConfig>,
  ) {}

  async generateTokens(id: string, nickname: string, role: Role): Promise<AuthTokensDto> {
    const accessToken = this.generateAccessToken(id, nickname, role);

    const refreshToken = this.generateRefreshToken(id);

    const userId = id;

    await this.createRefreshToken(userId, refreshToken);

    return plainToInstance(AuthTokensDto, { accessToken, refreshToken });
  }

  async verifyRefreshToken(userId: string, refreshToken: string): Promise<TokenDto> {
    const token: TokenDto | null = await this.tokenRepository.findTokenByUserId(userId);

    if (!token)
      throw new UnauthorizedException('The user is invalid. Please ensure you are signed in.');

    const { refreshToken: hashedRefreshToken } = token;

    const isRefreshTokenMatched = await bcrypt.compare(refreshToken, hashedRefreshToken);

    // When a user is logged in from two clients, this is the error returned when attempting to reissue an access token using the first logged-in client.
    if (!isRefreshTokenMatched)
      throw new UnauthorizedException(
        'Your session has been invalidated due to a new sign-in from another client. Please sign in again to continue.',
      );

    return token;
  }

  async deleteRefreshToken(userId: string): Promise<void> {
    const { affected } = await this.tokenRepository.deleteToken(userId);

    if (!affected) throw new UnauthorizedException('The refresh token has already been deleted.');
  }

  generateAccessToken(id: string, nickname: string, role: Role): string {
    return this.jwtService.sign({ id, nickname, role });
  }

  private generateRefreshToken(id: string): string {
    return this.jwtService.sign(
      { id },
      {
        secret: this.config.jwt.refreshToken.secret,
        subject: 'refresh-token',
        expiresIn: this.config.jwt.refreshToken.expiresIn,
      },
    );
  }

  private async createRefreshToken(userId: string, refreshToken: string): Promise<void> {
    const hashedRefreshToken = await bcrypt.hash(
      refreshToken,
      this.hashConfig.bcrypt.refreshTokenSalt,
    );

    await this.tokenRepository.upsertToken(userId, hashedRefreshToken);
  }
}
