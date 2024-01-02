import { Test, TestingModule } from '@nestjs/testing';
import { RevokeTokenController } from './revoke-token.controller';
import { RevokeTokenService } from './revoke-token.service';

describe('RevokeTokenController', () => {
  let controller: RevokeTokenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RevokeTokenController],
      providers: [RevokeTokenService],
    }).compile();

    controller = module.get<RevokeTokenController>(RevokeTokenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
