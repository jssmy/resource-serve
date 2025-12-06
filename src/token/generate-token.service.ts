import { HttpException, Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { AccessTokenPayload } from './interfaces/access-token.payload';
import { Helper } from 'src/commons/classes/helper';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { AccessToken } from './entities/access-token.entity';
import { Repository } from 'typeorm';
import { RefreshTokenPayload } from './interfaces/refresh-token.payload';
import { RefreshToken } from './entities/refresh-token.entity';
import { SuccessHandle } from 'src/commons/classes/success.handle';

@Injectable()
export class GenerateTokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectRepository(AccessToken)
    private readonly tokenRepository: Repository<AccessToken>,
    @InjectRepository(RefreshToken)
    private readonly refreshRepository: Repository<RefreshToken>,
  ) {}

  async token(user: User) {
    const accessTokenPayload: AccessTokenPayload = {
      name: user.name,
      surnames: user.surnames,
      uid: user.id,
      id: Helper.uuid(),
    };

    const refreshTokenPayload: RefreshTokenPayload = {
      aid: accessTokenPayload.id,
      id: Helper.uuid(),
    };

    return Promise.all([
      this.getAccessToken(accessTokenPayload),
      this.getRefreshToken(refreshTokenPayload),
    ]).then((jwt) => {
      const [accessToken, refreshToken] = jwt;
      return {
        accessToken,
        refreshToken,
      };
    });
  }

  private async getAccessToken(payload: AccessTokenPayload) {
    const tokenSign = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_TOKEN_SECRET'),
      expiresIn: this.configService.get('JWT_TOKEN_EXPIRE'),
    });

    const token = this.tokenRepository.create({
      id: payload.id,
      userId: payload.uid,
    });

    await this.tokenRepository.save(token);

    return tokenSign;
  }

  private async getRefreshToken(payload: RefreshTokenPayload) {
    const refreshSing = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRE'),
    });

    const refresh = this.refreshRepository.create({
      id: payload.id,
      accessTokenId: payload.aid,
    });

    await this.refreshRepository.save(refresh);

    return refreshSing;
  }

  refreshToken(refresh: string, user: User) {
    const accessTokenPayload: AccessTokenPayload = {
      name: user.name,
      uid: user.id,
      id: Helper.uuid(),
      surnames: user.surnames,
    };

    const refreshTokenPayload: RefreshTokenPayload = {
      aid: accessTokenPayload.id,
      id: Helper.uuid(),
    };
    const { aid, id }: RefreshTokenPayload = this.jwtService.decode(refresh, {
      json: true,
    });

    return Promise.all([
      this.getAccessToken(accessTokenPayload),
      this.getRefreshToken(refreshTokenPayload),
      this.refreshRepository.update(id, { revoked: true }),
      this.tokenRepository.update(aid, { revoked: true }),
    ])
      .then((actions) => {
        const [accessToken, refreshToken] = actions;
        return {
          accessToken,
          refreshToken,
        };
      })
      .catch((err) => {
        throw new HttpException(err, err.status || 500);
      });
  }

  private async revoke(id: string) {
    const accessToken = await this.tokenRepository.findOne({
      where: { revoked: false, id: id },
    });

    const refreshToken = await this.refreshRepository.findOne({
      where: { accessTokenId: accessToken.id },
    });

    return Promise.all([
      this.tokenRepository.update(accessToken.id, { revoked: true }),
      this.refreshRepository.update(refreshToken.id, { revoked: true }),
    ]).then(() => new SuccessHandle('Token revocado exitosamente'));
  }

  logout(accessToken: string) {
    const { id }: AccessToken = this.jwtService.decode(accessToken, {
      json: true,
    });
    return this.revoke(id);
  }
}
