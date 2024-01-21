import { Test, TestingModule } from '@nestjs/testing';
import { GenerateTokenService } from './generate-token.service';

describe('TokenService', () => {
  let service: GenerateTokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GenerateTokenService],
    }).compile();

    service = module.get<GenerateTokenService>(GenerateTokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
