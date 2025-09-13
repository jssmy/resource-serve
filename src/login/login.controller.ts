import { Controller, Post, Body } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from './dto/login.dto';
import { ApiLogin } from '../config/doc';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  @ApiLogin()
  attemp(@Body() loginDto: LoginDto) {
    return this.loginService.attemp(loginDto);
  }
}
