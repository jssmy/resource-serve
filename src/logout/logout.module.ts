import { Module } from '@nestjs/common';
import { LogoutController } from './logout.controller';
import { TokenModule } from 'src/token/token.module';

@Module({
  controllers: [LogoutController],
  providers: [],
  imports: [TokenModule],
})
export class LogoutModule {}
