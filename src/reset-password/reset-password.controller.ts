import { Controller, Post, Body, Patch, Param, ParseUUIDPipe } from '@nestjs/common';
import { ResetPasswordService } from './reset-password.service';
import { ResetPasswordRequestDto } from './dto/reset-password-request.tdo';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ApiSendResetPasswordMail, ApiResetPassword } from 'src/config/doc/reset-password/reset-password-api.decorator';
import { Auth } from 'src/commons/guards/auth';

@Controller('reset-password')
export class ResetPasswordController {
  constructor(private readonly resetPasswordService: ResetPasswordService) {}

  @Post()
  @ApiSendResetPasswordMail()
  sendResetPasswordMail(@Body() resetPasswordDto: ResetPasswordRequestDto) {
    return this.resetPasswordService.sendMailResetPassword(resetPasswordDto);
  }

  @Patch('/:token')
  @ApiResetPassword()
  resetPassword(
    @Param('token', new ParseUUIDPipe()) token: string,
    @Body() resetPassword: ResetPasswordDto,
  ) {
    return this.resetPasswordService.resetPassword(token, resetPassword);
  }
}
