import { Module } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';
import { UserModule } from 'src/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from 'src/mail/mail.module';
import { ConfirmAccountService } from '../confirm-account/confirm-account.service';
import { ConfirmAccountModule } from 'src/confirm-account/confirm-account.module';

@Module({
  controllers: [RegisterController],
  providers: [RegisterService, ConfirmAccountService],
  imports: [UserModule, ConfigModule, MailModule, ConfirmAccountModule],
})
export class RegisterModule {}
