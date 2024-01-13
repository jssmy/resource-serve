import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { MailModule } from 'src/mail/mail.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    ConfigModule,
    PassportModule,
    TypeOrmModule.forFeature([User]),
    MailModule,
  ],
  exports: [UserService, TypeOrmModule, ConfigModule],
})
export class UserModule {}
