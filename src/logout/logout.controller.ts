import { Controller, UseGuards, Headers, Post } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { trim } from 'src/commons/utils/string.util';
import { GenerateTokenService } from 'src/token/generate-token.service';

@Controller('logout')
export class LogoutController {
  constructor(private readonly tokenService: GenerateTokenService) {}

  @Post()
  @UseGuards(AuthGuard('jwt-access'))
  logout(@Headers('authorization') accessToken: string) {
    return this.tokenService.logout(
      trim(accessToken.replace('Bearer', ''.trim()), ' '),
    );
  }
}
