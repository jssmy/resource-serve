import { Module } from '@nestjs/common';
import { RevokeTokenService } from './revoke-token.service';
import { RevokeTokenController } from './revoke-token.controller';

@Module({
  controllers: [RevokeTokenController],
  providers: [RevokeTokenService],
})
export class RevokeTokenModule {}
