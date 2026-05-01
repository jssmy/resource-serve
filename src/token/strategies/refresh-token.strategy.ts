import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { RefreshTokenPayload } from '../interfaces/refresh-token.payload';
import { Repository } from 'typeorm';
import { RefreshToken } from '../entities/refresh-token.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AccessToken } from '../entities/access-token.entity';
import { Request } from 'express';
import { User } from '@user/entities/user.entity';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    private readonly config: ConfigService,
    @InjectRepository(RefreshToken)
    private readonly refreshRepository: Repository<RefreshToken>,
    @InjectRepository(AccessToken)
    private readonly accessRepository: Repository<AccessToken>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super({
      secretOrKey: config.get('JWT_REFRESH_TOKEN_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: RefreshTokenPayload) {
    const { id, aid } = payload;

    const refreshToken = await this.refreshRepository.findOneBy({ id });

    if (!refreshToken) {
      throw new UnauthorizedException('Token inválido');
    }

    if (refreshToken.revoked) {
      // this token was refreshed
      throw new UnauthorizedException('Token inválido');
    }

    const accessToken = await this.accessRepository.findOneBy({ id: aid });

    if (!accessToken) {
      throw new UnauthorizedException('Token inválido');
    }

    if (refreshToken.accessTokenId != aid) {
      throw new UnauthorizedException('Token inválido');
    }

    if (accessToken.revoked) {
      throw new UnauthorizedException('Token inválido');
    }
    const user = await this.userRepository.findOneBy({
      id: accessToken.userId,
    });

    if (!user.state) {
      throw new UnauthorizedException('Usuario inactivo');
    }

    return user;
  }
}
