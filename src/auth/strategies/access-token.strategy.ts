import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { AccessToken } from '../entities/access-token.entity';
import { AccessTokenPayload } from '../interfaces/access-token.payload';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-access',
) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(AccessToken)
    private readonly accessTokenRepository: Repository<AccessToken>,
    private readonly config: ConfigService,
  ) {
    super({
      secretOrKey: config.get('JWT_TOKEN_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: AccessTokenPayload): Promise<User> {
    const { uid, id } = payload;

    const token = await this.accessTokenRepository.findOneBy({ id });

    if (!token) {
      throw new UnauthorizedException('Token is invalid');
    }

    if (token.userId != uid) {
      throw new UnauthorizedException('Token is invalid');
    }

    if (token.revoked) {
      throw new UnauthorizedException('Token is invalid');
    }

    const user = await this.userRepository.findOneBy({ id: uid });

    if (!user) {
      throw new UnauthorizedException('Token is invalid');
    }

    if (!user.state) {
      throw new UnauthorizedException('User is inactive');
    }

    return user;
  }
}
