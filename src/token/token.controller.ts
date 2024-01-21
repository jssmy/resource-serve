import { Controller, Headers, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/user/decoratos/get-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { GenerateTokenService } from './generate-token.service';

@Controller('token')
export class TokenController {
  constructor(private readonly generateTokenService: GenerateTokenService) {}

  @Post('refresh')
  @UseGuards(AuthGuard('jwt-refresh'))
  refreshToken(
    @Headers('authorization') refreshToken: string,
    @GetUser() user: User,
  ) {
    return this.generateTokenService.refreshToken(
      refreshToken.replace('Bearer', '').trim(),
      user,
    );
  }
}
