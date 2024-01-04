import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';
import { AccessToken } from './entities/access-token.entity';
import { RefreshToken } from './entities/refresh-token.entity';

@Module({
  controllers: [
    AuthController
  ],
  providers: [
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    JwtService,
  ],
  imports: [
    TypeOrmModule.forFeature([
      AccessToken,
      RefreshToken  
    ]),
    UserModule,
    ConfigModule,
    PassportModule,
    JwtModule,
  ],
  exports: [
    AccessTokenStrategy
  ]
})
export class AuthModule { }
