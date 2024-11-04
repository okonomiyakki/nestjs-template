import bcryptConfig from '@core/config/bcrypt.config';
import jwtConfig from '@core/config/jwt.config';
import { TokenRepository } from '@core/type-orm/repositories/token.repository';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenPayloadDto } from '@token/dtos/internals/access-token-payload.dto';
import { AuthTokensDto } from '@token/dtos/internals/auth-tokens-dto';
import { RefreshTokenPayloadDto } from '@token/dtos/internals/refresh-token-payload.dto';
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

  async generateTokens(
    accessTokenPayload: AccessTokenPayloadDto,
    refreshTokenPayload: RefreshTokenPayloadDto,
  ): Promise<AuthTokensDto> {
    const accessToken = this.generateAccessToken(accessTokenPayload);

    const refreshToken = this.generateRefreshToken(refreshTokenPayload);

    await this.createRefreshToken(refreshTokenPayload, refreshToken);

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

  private generateAccessToken(payload: AccessTokenPayloadDto): string {
    return this.jwtService.sign({ ...payload });
  }

  private generateRefreshToken(payload: RefreshTokenPayloadDto): string {
    return this.jwtService.sign(
      { ...payload },
      {
        secret: this.config.jwt.refreshToken.secret,
        subject: 'refresh-token',
        expiresIn: this.config.jwt.refreshToken.expiresIn,
      },
    );
  }

  private async createRefreshToken(
    payload: RefreshTokenPayloadDto,
    refreshToken: string,
  ): Promise<void> {
    const { id: userId } = payload;

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
