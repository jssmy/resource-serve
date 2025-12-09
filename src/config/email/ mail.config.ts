import { MailerAsyncOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { AppSettings } from '@commons/utils/app-settings.util';

export const mailConfig: MailerAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => {
    const host = config.get('MAIL_HOST');
    const port = Number(config.get('MAIL_PORT') ?? 465);
    const secure = port === 465;
    const mailFromName = AppSettings.APP_NAME;
    const mainFromEmail = AppSettings.APP_SUPPORT_EMAIL;
    const user = config.get('MAIL_USERNAME');
    const pass = config.get('MAIL_PASSWORD');

    const configMail = {
      transport: {
        host,
        port,
        secure, // true for 465, false for other ports
        auth: {
          user,
          pass,
        },
        tls: {
          rejectUnauthorized: false, // Ignore self-signed certificate
        },
      },
      defaults: {
        from: `${mailFromName} <${mainFromEmail}>`,
      },
      template: {
        dir: __dirname + '/../../commons/mail-templates',
        adapter: new PugAdapter({ inlineCssEnabled: true }),
        options: {
          strict: true,
        },
      },
    };

    return configMail;
  },
};
