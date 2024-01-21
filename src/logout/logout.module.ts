import { Module } from '@nestjs/common';
import { LogoutService } from './logout.service';
import { LogoutController } from './logout.controller';
import { TokenModule } from 'src/token/token.module';

@Module({
  controllers: [LogoutController],
  providers: [LogoutService],
  imports: [TokenModule],
})
export class LogoutModule {}
