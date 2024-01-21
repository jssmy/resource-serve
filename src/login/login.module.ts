import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { UserModule } from 'src/user/user.module';
import { TokenModule } from 'src/token/token.module';

@Module({
  controllers: [LoginController],
  providers: [LoginService],
  imports: [UserModule, TokenModule],
})
export class LoginModule { }
