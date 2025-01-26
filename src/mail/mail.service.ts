import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class MailService {
  constructor(
    private readonly mailService: MailerService,
    private readonly config: ConfigService,
  ) {}

  async sendMailAccountConfirmation(user: User, token: string) {
    const URL_CONFIRMATION_ACCOUNT = `${this.config.get(
      'MAIL_CONFIRM_URL',
    )}/${token}`;

    const PASSWORD_GENERATED = user.password;
    try {
      return this.mailService.sendMail({
        to: user.email,
        subject: 'Confirmación de cuenta',
        template: 'not-replay',
        context: {
          URL_CONFIRMATION_ACCOUNT,
          PASSWORD_GENERATED,
        },
      });
    } catch (e) {}
  }

  sendMailResetPassword(user: User, token: string) {
    const url = `${this.config.get('MAIL_RESET_PASSEWORD_URL')}/${token}`;
    this.mailService
      .sendMail({
        to: user.email,
        subject: 'Cambiar contraseña',
        template: 'reset-password',
        context: {
          username: user.name,
          url,
        },
      })
      .finally();
  }

  sendMailResetPasswordConfirmation(user: User) {
    this.mailService
      .sendMail({
        to: user.email,
        subject: 'Contraseña actualizada',
        template: 'reset-password-confirm',
        context: {
          username: user.name,
        },
      })
      .finally();
  }
}
