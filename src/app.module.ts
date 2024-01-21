import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { databaseConfiguration } from './config/database/db-auth.config';
import { MailModule } from './mail/mail.module';
import { RegisterModule } from './register/register.module';
import { LoginModule } from './login/login.module';
import { LogoutModule } from './logout/logout.module';
import { ResetPasswordModule } from './reset-password/reset-password.module';
import { ForgotPasswordModule } from './forgot-password/forgot-password.module';
import { TokenModule } from './token/token.module';
import { ConfirmAccountModule } from './confirm-account/confirm-account.module';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(databaseConfiguration()),
    MailModule,
    RegisterModule,
    LoginModule,
    LogoutModule,
    ResetPasswordModule,
    ForgotPasswordModule,
    TokenModule,
    ConfirmAccountModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
