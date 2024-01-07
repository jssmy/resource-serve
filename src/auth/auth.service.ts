import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserFactory } from 'src/user/factory/user.factory';
import { MailService } from 'src/mail/mail.service';
import { AccountValidationFactory } from 'src/user/factory/account-validation.factory';
import { CreatedHandle } from 'src/commons/classes/created.handle';
import { SuccessHandle } from 'src/commons/classes/success.handle';

@Injectable()
export class AuthService {
  private readonly log = new Logger();

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
    private readonly mail: MailService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    try {
      const user = new UserFactory(createUserDto).create();
      await this.userRepository.save(user);
      this.sendMailAccountValidation(user).finally();
      return new CreatedHandle(
        'Account created succesfull. Plese valid your account.',
      );
    } catch (error) {
      this.log.error(error);
      this.handleDBException(error);
    }
  }
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

  async retryAccounValidation(email: string) {
    email = email.toLocaleLowerCase();
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new NotFoundException('Email not found');
    }

    if (user.accountValidated) {
      throw new BadRequestException('Email account is already validated');
    }

    await this.sendMailAccountValidation(user);

    return new SuccessHandle(
      `Mail was send to ${email}, please yor inbox mail`,
    );
  }

  private async sendMailAccountValidation(user: User) {
    const accountValidation = new AccountValidationFactory(
      user.id,
      this.config.get('MAIL_CONFIRM_EXPIRES_IN'),
    ).create();

    await this.accountRepository.save(accountValidation);
    this.mail.sendMailAccountConfirmation({
      to: user.email,
      token: accountValidation.token,
    });
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

  private handleDBException(error) {
    if (error.code === 'ER_DUP_ENTRY') {
      throw new BadRequestException(error.sqlMessage);
    }

    throw new InternalServerErrorException(error.sqlMessage);
  }
}
