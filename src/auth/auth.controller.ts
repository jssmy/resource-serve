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
import { RetryAccountValidationDto } from './dto/retry-account-validation.dto';

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
  retryAccounValidation(@Body() retryDto: RetryAccountValidationDto) {
    return this.authService.retryAccounValidation(retryDto.email);
  }
}
