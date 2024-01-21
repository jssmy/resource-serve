import { Controller, Post, Body } from '@nestjs/common';
import { RegisterService } from './register.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.registerService.create(createUserDto);
  }
}
