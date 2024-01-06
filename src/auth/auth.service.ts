import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UpdateTokenDto } from './dto/update-token.dto';
import { ByCript } from 'src/commons/classes/bycript';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { AccessTokenPayload } from './interfaces/access-token.payload';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Helper } from 'src/commons/classes/helper';
import { AccessToken } from './entities/access-token.entity';
import { RefreshTokenPayload } from './interfaces/refresh-token.payload';
import { RefreshToken } from './entities/refresh-token.entity';
import { AccountValidation } from 'src/user/entities/account-validation.entity';
import { DateHelper } from 'src/commons/classes/date-helper';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(AccessToken)
    private readonly tokenRepository: Repository<AccessToken>,
    @InjectRepository(RefreshToken)
    private readonly refreshRepository: Repository<RefreshToken>,
    @InjectRepository(AccountValidation)
    private readonly accountRepository: Repository<AccountValidation>,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async attemp(email: string, password: string) {
    email = email.toLocaleLowerCase();
    const user = await this.userRepository.findOne({
      where: { email },
      select: {
        id: true,
        name: true,
        password: true,
        state: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Credentials are incorrect');
    }

    const isHashedOk = ByCript.compareSync(password, user.password);

    if (!isHashedOk) {
      throw new UnauthorizedException('Credentials are incorrect');
    }

    if (!user.state) {
      throw new UnauthorizedException('User is inactive');
    }

    if (!user.accountValidated) {
      throw new UnauthorizedException('Please validate your account');
    }

    const accessTokenPayload: AccessTokenPayload = {
      name: user.name,
      uid: user.id,
      id: Helper.uuid(),
    };

    const refreshTokenPayload: RefreshTokenPayload = {
      aid: accessTokenPayload.id,
      id: Helper.uuid(),
    };

    const token = await this.getAccessToken(accessTokenPayload);
    const refreshToken = await this.getRefreshToken(refreshTokenPayload);
    return {
      token,
      refreshToken,
    };
  }

  async refreshToken(refresh: string, user: User) {
    const accessTokenPayload: AccessTokenPayload = {
      name: user.name,
      uid: user.id,
      id: Helper.uuid(),
    };

    const refreshTokenPayload: RefreshTokenPayload = {
      aid: accessTokenPayload.id,
      id: Helper.uuid(),
    };

    const token = await this.getAccessToken(accessTokenPayload);
    const refreshToken = await this.getRefreshToken(refreshTokenPayload);

    const { aid, id }: RefreshTokenPayload = this.jwtService.decode(refresh, {
      json: true,
    });
    this.refreshRepository.update(id, { revoked: true });
    this.tokenRepository.update(aid, { revoked: true });

    return {
      token,
      refreshToken,
    };
  }

  private async getAccessToken(payload: AccessTokenPayload) {
    const tokenSign = this.jwtService.sign(payload, {
      secret: this.config.get('JWT_TOKEN_SECRET'),
      expiresIn: this.config.get('JWT_TOKEN_EXPIRE'),
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
      secret: this.config.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: this.config.get('JWT_REFRESH_TOKEN_EXPIRE'),
    });

    const refresh = this.refreshRepository.create({
      id: payload.id,
      accessTokenId: payload.aid,
    });

    await this.refreshRepository.save(refresh);

    return refreshSing;
  }

  async accountValidation(token: string) {
    const account = await this.accountRepository.findOneBy({ token });

    if (!account) {
      throw new BadRequestException('Token is invalid');
    }

    const isExpiredToken =
      DateHelper.date(account.expiresIn).diff(DateHelper.date(), 'hours') <= 0;

    if (isExpiredToken) {
      throw new HttpException('Token expired', 419);
    }

    if (account.revoked) {
      return {
        message: 'Account validated',
      };
    }

    await this.accountRepository.update(account.token, { revoked: true });
    await this.userRepository.update(account.userId, {
      accountValidated: true,
      accountValidatedDate: DateHelper.date().toDate(),
    });

    return {
      message: 'Account validated',
    };
  }

  findAll() {
    return `This action returns all token`;
  }

  findOne(id: number) {
    return `This action returns a #${id} token`;
  }

  update(id: number, updateTokenDto: UpdateTokenDto) {
    return {
      id,
      updateTokenDto,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} token`;
  }
}
