import { Module } from '@nestjs/common';
import { ResetPasswordService } from './reset-password.service';
import { ResetPasswordController } from './reset-password.controller';
import { UserModule } from '@user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from '@mail/mail.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResetPassword } from './entities/reset-password.entity';

@Module({
  controllers: [ResetPasswordController],
  imports: [
    UserModule,
    ConfigModule,
    MailModule,
    TypeOrmModule.forFeature([ResetPassword]),
  ],
  providers: [ResetPasswordService],
})
export class ResetPasswordModule {}
