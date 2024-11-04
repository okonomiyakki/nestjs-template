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

  async generateTokens(userId: string): Promise<AuthTokensDto> {
    const accessToken = this.generateAccessToken(userId);

    const refreshToken = this.generateRefreshToken(userId);

    await this.createRefreshToken(userId, refreshToken);

    return plainToInstance(AuthTokensDto, { accessToken, refreshToken });
  }

  async verifyRefreshToken(userId: string, refreshToken: string): Promise<void> {
    const token: TokenDto = await this.validateRefreshToken(userId);

    const { refreshToken: hashedRefreshToken } = token;

    const isRefreshTokenMatched = await bcrypt.compare(refreshToken, hashedRefreshToken);

    if (!isRefreshTokenMatched)
      throw new UnauthorizedException(
        'The refresh token is incorrect. Please sign in again to obtain new token.',
      );
  }

  private generateAccessToken(userId: string): string {
    return this.jwtService.sign({ userId });
  }

  private generateRefreshToken(userId: string): string {
    return this.jwtService.sign(
      { userId },
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

  private async validateRefreshToken(userId: string): Promise<TokenDto> {
    const token: TokenDto | null = await this.tokenRepository.findTokenByUserId(userId);

    if (!token) throw new UnauthorizedException('Invalid payload.');

    return token;
  }
}
