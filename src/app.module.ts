import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
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
import { CustomThrottlerGuard } from './commons/guards/throttler.guard';
import { OriginGuard } from './commons/guards/origin.guard';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return databaseConfiguration(config);
      },
    }),
    // Rate Limiting - Actualmente usando memoria
    // TODO: Migrar a Redis para producción con múltiples instancias
    // Instalar: npm install @nestjs/throttler-storage-redis
    // Configurar Redis storage para compartir límites entre instancias
    // Ejemplo:
    // ThrottlerModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService) => ({
    //     storage: new ThrottlerStorageRedisService({
    //       host: config.get('REDIS_HOST'),
    //       port: config.get('REDIS_PORT'),
    //     }),
    //     throttlers: [{
    //       ttl: 60000, // 60 segundos
    //       limit: 10, // 10 requests por minuto
    //     }],
    //   }),
    // }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // Tiempo en milisegundos (60 segundos)
        limit: 10, // Número máximo de requests en el tiempo TTL
      },
    ]),
    MailModule,
    RegisterModule,
    LoginModule,
    LogoutModule,
    ResetPasswordModule,
    TokenModule,
    ConfirmAccountModule,
    RolesModule,
    PermissionsModule,
    ControlAccessModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // Rate limiting global - aplica a todos los endpoints
    {
      provide: APP_GUARD,
      useClass: CustomThrottlerGuard,
    },
    // Validación de origen global - solo permite requests de dominios permitidos
    // Dominios permitidos: hardacodeando.com, bugzilo.com
    {
      provide: APP_GUARD,
      useClass: OriginGuard,
    },
  ],
})
export class AppModule {}
