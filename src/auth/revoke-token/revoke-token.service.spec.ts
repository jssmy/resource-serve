import { Test, TestingModule } from '@nestjs/testing';
import { RevokeTokenService } from './revoke-token.service';

describe('RevokeTokenService', () => {
  let service: RevokeTokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RevokeTokenService],
    }).compile();

    service = module.get<RevokeTokenService>(RevokeTokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
