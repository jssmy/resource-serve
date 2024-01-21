import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessToken } from './entities/access-token.entity';
import { RefreshToken } from './entities/refresh-token.entity';
import { UserModule } from 'src/user/user.module';
import { GenerateTokenService } from './generate-token.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { TokenController } from './token.controller';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';
import { AccessTokenStrategy } from './strategies/access-token.strategy';

@Module({
  controllers: [TokenController],
  providers: [GenerateTokenService, AccessTokenStrategy, RefreshTokenStrategy],
  imports: [
    JwtModule,
    ConfigModule,
    UserModule,
    TypeOrmModule.forFeature([AccessToken, RefreshToken]),
  ],
  exports: [GenerateTokenService],
})
export class TokenModule {}
