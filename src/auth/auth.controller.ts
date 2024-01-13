import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { CreateTokenDto } from './dto/create-token.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/user/decoratos/get-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Auth } from './guards/auth';
import { UserGrant } from 'src/commons/types/user-grant';
import { MailValidationDto } from './dto/mail-validation.dto';
import { PassordResetDto } from './dto/password-reset.tdo';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @Auth(UserGrant.ADMIN)
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('token')
  attemp(@Body() createTokenDto: CreateTokenDto) {
    return this.authService.attemp(
      createTokenDto.email,
      createTokenDto.password,
    );
  }

  @Post('refresh-token')
  @UseGuards(AuthGuard('jwt-refresh'))
  refresh(
    @Headers('authorization') refreshToken: string,
    @GetUser() user: User,
  ) {
    return this.authService.refreshToken(
      refreshToken.replace('Bearer', '').trim(),
      user,
    );
  }

  @Get('account-validation/:token')
  accounValidation(@Param('token') token: string) {
    return this.authService.accountValidation(token);
  }

  @Post('retry-validation')
  retryAccounValidation(@Body() retryDto: MailValidationDto) {
    return this.authService.retryAccounValidation(retryDto.email);
  }

  @Post('reset-password-request')
  resetPasswordRequest(@Body() resetDto: MailValidationDto) {
    return this.authService.resetPasswordRequest(resetDto.email);
  }

  @Post('reset-password/:token')
  resetPassdword(
    @Param('token') token: string,
    @Body() resetDto: PassordResetDto,
  ) {
    return this.authService.resetPassword(token, resetDto.password);
  }
}
