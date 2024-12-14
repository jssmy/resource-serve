import { Controller, Post, Body } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterUserDto } from 'src/user/dto/register-user.dto';

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  create(@Body() createUserDto: RegisterUserDto) {
    return this.registerService.create(createUserDto);
  }
}
