import { Module } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';
import { UserModule } from '@user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from '@mail/mail.module';
import { ConfirmAccountService } from '../confirm-account/confirm-account.service';
import { ConfirmAccountModule } from '@confirm-account/confirm-account.module';

@Module({
  controllers: [RegisterController],
  providers: [RegisterService, ConfirmAccountService],
  imports: [UserModule, ConfigModule, MailModule, ConfirmAccountModule],
})
export class RegisterModule {}
