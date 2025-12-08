import { Controller, UseGuards, Headers, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { trim } from '@commons/utils/string.util';
import { GenerateTokenService } from '@token/generate-token.service';
import { ApiLogout } from '../config/doc';

@Controller('logout')
export class LogoutController {
  constructor(private readonly tokenService: GenerateTokenService) {}

  @Post()
  @UseGuards(AuthGuard('jwt-access'))
  @ApiLogout()
  logout(@Headers('authorization') accessToken: string) {
    return this.tokenService.logout(
      trim(accessToken.replace('Bearer', ''.trim()), ' '),
    );
  }
}
