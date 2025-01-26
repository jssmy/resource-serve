import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ConfirmAccountDto } from './dto/confirm-account.dto';
import { ConfirmAccountService } from './confirm-account.service';

@Controller('confirm-account')
export class ConfirmAccountController {
  constructor(private readonly confirmAccountService: ConfirmAccountService) {}

  @Get('/:token')
  confirm(@Param('token') token: string) {
    return this.confirmAccountService.confrim(token);
  }

  @Post('send')
  sendRetryConfirmation(@Body() confirmDto: ConfirmAccountDto) {
    return this.confirmAccountService.retryConfirmation(confirmDto);
  }
}
