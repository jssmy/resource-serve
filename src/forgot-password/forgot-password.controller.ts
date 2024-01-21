import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ForgotPasswordService } from './forgot-password.service';
import { CreateForgotPasswordDto } from './dto/create-forgot-password.dto';
import { UpdateForgotPasswordDto } from './dto/update-forgot-password.dto';

@Controller('forgot-password')
export class ForgotPasswordController {
  constructor(private readonly forgotPasswordService: ForgotPasswordService) {}

  @Post()
  create(@Body() createForgotPasswordDto: CreateForgotPasswordDto) {
    return this.forgotPasswordService.create(createForgotPasswordDto);
  }

  @Get()
  findAll() {
    return this.forgotPasswordService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.forgotPasswordService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateForgotPasswordDto: UpdateForgotPasswordDto,
  ) {
    return this.forgotPasswordService.update(+id, updateForgotPasswordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.forgotPasswordService.remove(+id);
  }
}
