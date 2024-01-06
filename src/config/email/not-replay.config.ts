import { MailerAsyncOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

export const notReplayMailAsynConfig: MailerAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => {
    const host = config.get('MAIL_HOST');
    const port = Number(config.get('MAIL_PORT') ?? 465);
    const secure = port === 465;
    const mailFromName = config.get('MAIL_FROM_NAME');
    const mainFromEmail = config.get('MAIL_FROM_ADDRESS');
    const user = config.get('MAIL_USERNAME');
    const pass = config.get('MAIL_PASSWORD');

    return {
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
  },
};
