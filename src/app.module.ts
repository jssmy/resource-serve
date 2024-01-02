import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TokenModule } from './auth/token/token.module';
import { RevokeTokenModule } from './auth/revoke-token/revoke-token.module';
import { UserModule } from './auth/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfiguration } from './database/connection/db-auth.config';


@Module({
  imports: [
    TokenModule,
    RevokeTokenModule,
    UserModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(databaseConfiguration())
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
