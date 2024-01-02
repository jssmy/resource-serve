import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserService } from '../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';

@Module({
  controllers: [
    TokenController
  ],
  providers: [
    TokenService,
    JwtStrategy,
    JwtService
  ],
  imports: [
    ConfigModule,
    UserModule,
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.registerAsync({
      imports: [ ConfigModule ],
      inject: [ ConfigService ],
      useFactory: ( config: ConfigService  ) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
          // privateKey: '111111',
          // publicKey: '123232323',
          signOptions: {
            expiresIn: '1h'
          }
        }
      }
    }),
  
  ],
  exports: [
    JwtStrategy,
    JwtService,
    TokenService
  ]
})
export class TokenModule {}
