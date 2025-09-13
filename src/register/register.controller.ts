import { Controller, Post, Body } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterUserDto } from 'src/user/dto/register-user.dto';
import { ApiRegister } from '../config/doc';

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  @ApiRegister()
  create(@Body() createUserDto: RegisterUserDto) {
    return this.registerService.create(createUserDto);
  }
}
