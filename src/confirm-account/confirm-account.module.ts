import { Module } from '@nestjs/common';
import { ConfirmAccountController } from './confirm-account.controller';
import { ConfirmAccountService } from '@confirm-account/confirm-account.service';
import { UserModule } from '@user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfirmAccount } from './entities/confirm-account.entity';
import { MailModule } from '@mail/mail.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [ConfirmAccountController],
  providers: [ConfirmAccountService],
  imports: [
    UserModule,
    TypeOrmModule.forFeature([ConfirmAccount]),
    MailModule,
    ConfigModule,
  ],
  exports: [ConfirmAccountService, TypeOrmModule],
})
export class ConfirmAccountModule {}
