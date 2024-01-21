import { Controller, Post, Body, Patch, Param } from '@nestjs/common';
import { ResetPasswordService } from './reset-password.service';
import { ResetPasswordRequestDto } from './dto/reset-password-request.tdo';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('reset-password')
export class ResetPasswordController {
  constructor(private readonly resetPasswordService: ResetPasswordService) {}

  @Post()
  sendResetPasswordMail(@Body() resetPasswordDto: ResetPasswordRequestDto) {
    return this.resetPasswordService.sendMailResetPassword(resetPasswordDto);
  }

  @Patch('/:token')
  resetPassword(
    @Param('token') token: string,
    @Body() resetPassword: ResetPasswordDto,
  ) {
    return this.resetPasswordService.resetPassword(token, resetPassword);
  }
}
