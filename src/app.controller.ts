import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiWelcome } from './config/doc';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiWelcome()
  getHello(): string {
    return this.appService.getHello();
  }
}
