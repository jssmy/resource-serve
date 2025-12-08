import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { mailConfig } from '@config/email/ mail.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [MailService],
  imports: [MailerModule.forRootAsync(mailConfig), ConfigModule],
  exports: [MailService, MailerModule],
})
export class MailModule {}
