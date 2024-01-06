import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { notReplayMailAsynConfig } from 'src/config/email/not-replay.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [MailService],
  imports: [MailerModule.forRootAsync(notReplayMailAsynConfig), ConfigModule],
  exports: [MailService, MailerModule],
})
export class MailModule {}
