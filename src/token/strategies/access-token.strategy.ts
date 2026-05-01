import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@user/entities/user.entity';
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
      throw new UnauthorizedException('Token inválido');
    }

    if (token.userId != uid) {
      throw new UnauthorizedException('Token inválido');
    }

    if (token.revoked) {
      throw new UnauthorizedException('Token inválido');
    }

    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .leftJoinAndSelect('role.permissions', 'permission')
      .where('user.id = :id', { id: uid })
      .cache(true)
      .getOne();

    if (!user) {
      throw new UnauthorizedException('Token inválido');
    }

    if (!user.state) {
      throw new UnauthorizedException('Usuario inactivo');
    }

    return user;
  }
}
