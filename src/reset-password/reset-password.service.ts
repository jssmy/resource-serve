import {
  BadRequestException,
  HttpException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ResetPasswordRequestDto } from './dto/reset-password-request.tdo';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ResetPasswordFactory } from './factories/reset-password.factory';
import { ConfigService } from '@nestjs/config';
import { ResetPassword } from './entities/reset-password.entity';
import { MailService } from 'src/mail/mail.service';
import { SuccessHandle } from 'src/commons/classes/success.handle';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { DateHelper } from 'src/commons/classes/date-helper';
import { ByCript } from 'src/commons/classes/bycript';
import { UserFactory } from 'src/user/factories/user.factory';

@Injectable()
export class ResetPasswordService {
  private readonly logger = new Logger(ResetPasswordService.name);
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(ResetPassword)
    private readonly resetPasswordRepository: Repository<ResetPassword>,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
  ) {}
  async sendMailResetPassword(resetPasswordDto: ResetPasswordRequestDto) {
    const email = resetPasswordDto.email.toLocaleLowerCase();

    const user = await this.userRepository.findOne({
      where: { state: true, accountValidated: true, email },
      select: {
        id: true,
        name: true,
        surnames: true,
        email: true,
      },
    });

    this.logger.log(`User found: ${JSON.stringify(user)}`);

    if (!user) {
      throw new NotFoundException('Email account is not found');
    }

    const resetPassword = new ResetPasswordFactory(
      user.id,
      this.configService.get('MAIL_RESET_PASSWORD_EXPIRES_IN'),
    ).create();

    await this.resetPasswordRepository.save(resetPassword);
    this.mailService.sendMailResetPassword(user, resetPassword.token);

    return new SuccessHandle(
      `Mail reset password was send to ${email}, please check your inbox`,
    );
  }

  async resetPassword(token: string, resetPasswordDto: ResetPasswordDto) {
    if (resetPasswordDto.password !== resetPasswordDto.confirmPassword) {
      throw new BadRequestException('Confirm password is not correct');
    }

    const resetPassword = await this.resetPasswordRepository.findOne({
      where: { revoked: false, token },
    });

    if (!resetPassword) {
      throw new NotFoundException('Token not found');
    }

    const isExpiredToken =
      DateHelper.date(resetPassword.expiresIn).diff(
        DateHelper.date(),
        'hours',
      ) <= 0;

    if (isExpiredToken) {
      throw new HttpException('Token is expired', 419);
    }

    const user = await this.userRepository.findOne({
      where: { id: resetPassword.userId, state: true },
      select: { password: true, id: true, email: true },
    });

    if (ByCript.compareSync(resetPasswordDto.password, user.password)) {
      throw new BadRequestException(
        'New password must be different to current password',
      );
    }

    await this.userRepository.update(
      user.id,
      new UserFactory({ password: resetPasswordDto.password }).create(),
    );

    this.resetPasswordRepository.update(resetPassword.token, { revoked: true });
    this.mailService.sendMailResetPasswordConfirmation(user);
    return new SuccessHandle('Password was reset');
  }

  async validateToken(token: string) {
    const resetPassword = await this.resetPasswordRepository.findOne({
      where: { revoked: false, token },
    });

    this.logger.log(`Reset password found: ${JSON.stringify(resetPassword)}`);

    if (!resetPassword) {
      throw new NotFoundException('Token not found');
    }

    const isExpiredToken =
      DateHelper.date(resetPassword.expiresIn).diff(
        DateHelper.date(),
        'hours',
      ) <= 0;

    if (isExpiredToken) {
      throw new HttpException('Token is expired', 419);
    }

    return new SuccessHandle('Token is valid');
  }
}
