import { Module } from '@nestjs/common';
import { LogoutService } from './logout.service';
import { LogoutController } from './logout.controller';

@Module({
  controllers: [LogoutController],
  providers: [LogoutService],
})
export class LogoutModule {}
