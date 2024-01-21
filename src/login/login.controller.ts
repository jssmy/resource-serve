import { Controller, Post, Body } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from './dto/login.dto';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) { }

  @Post()
  attemp(@Body() loginDto: LoginDto) {
    return this.loginService.attemp(loginDto);
  }
}
