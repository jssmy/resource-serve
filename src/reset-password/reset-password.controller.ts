import { Controller, Post, Body, Patch, Param, ParseUUIDPipe, Get } from '@nestjs/common';
import { ResetPasswordService } from './reset-password.service';
import { ResetPasswordRequestDto } from './dto/reset-password-request.tdo';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ApiSendResetPasswordMail, ApiResetPassword, ApiValidateResetPasswordToken } from 'src/config/doc/reset-password/reset-password-api.decorator';
import { Auth } from 'src/commons/guards/auth';

@Controller('password')
export class ResetPasswordController {
  constructor(private readonly resetPasswordService: ResetPasswordService) {}

  @Post('/request')
  @ApiSendResetPasswordMail()
  sendResetPasswordMail(@Body() resetPasswordDto: ResetPasswordRequestDto) {
    return this.resetPasswordService.sendMailResetPassword(resetPasswordDto);
  }

  @Get('/token/:token')
  @ApiValidateResetPasswordToken()
  validateToken(@Param('token') token: string) {
    return this.resetPasswordService.validateToken(token);
  }

  @Patch('/change/:token')
  @ApiResetPassword()
  resetPassword(
    @Param('token') token: string,
    @Body() resetPassword: ResetPasswordDto,
  ) {
    return this.resetPasswordService.resetPassword(token, resetPassword);
  }
}
