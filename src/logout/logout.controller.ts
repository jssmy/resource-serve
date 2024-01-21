import { Controller, Delete, UseGuards, Headers } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { GenerateTokenService } from 'src/token/generate-token.service';

@Controller('logout')
export class LogoutController {
  constructor(private readonly tokenService: GenerateTokenService) {}

  @Delete()
  @UseGuards(AuthGuard('jwt-access'))
  logout(@Headers('authorization') accessToken: string) {
    return this.tokenService.logout(accessToken.replace('Bearer', ''.trim()));
  }
}
