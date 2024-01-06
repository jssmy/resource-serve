import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(
    private readonly mailService: MailerService,
    private readonly config: ConfigService,
  ) {}
  sendMailAccountConfirmation({ to, token }) {
    const url = `${this.config.get('MAIL_CONFIRM_URL')}/${token}`;
    this.mailService
      .sendMail({
        to: to,
        subject: 'Validación de cuenta',
        template: 'not-replay',
        context: {
          url,
        },
      })
      .finally();
  }

  sendMailResetPassword(email: string) {
    this.mailService
      .sendMail({
        to: email,
        subject: 'Testing Nest Mailermodule with template ✔',
        template: 'not-replay',
      })
      .finally();
  }
}
