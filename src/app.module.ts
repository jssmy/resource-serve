import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { MailModule } from './mail/mail.module';
import { RegisterModule } from './register/register.module';
import { LoginModule } from './login/login.module';
import { LogoutModule } from './logout/logout.module';
import { ResetPasswordModule } from './reset-password/reset-password.module';
import { TokenModule } from './token/token.module';
import { ConfirmAccountModule } from './confirm-account/confirm-account.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { databaseConfiguration } from './config/database/db-auth.config';
import { ControlAccessModule } from './control-access/control-access.module';



@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ ConfigService ],
      useFactory: (config: ConfigService) => databaseConfiguration(config),
    }),
    MailModule,
    RegisterModule,
    LoginModule,
    LogoutModule,
    ResetPasswordModule,
    TokenModule,
    ConfirmAccountModule,
    RolesModule,
    PermissionsModule,
    ControlAccessModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
