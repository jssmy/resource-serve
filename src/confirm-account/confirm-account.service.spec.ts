import { Test, TestingModule } from '@nestjs/testing';
import { ConfirmAccountService } from 'src/confirm-account/confirm-account.service';

describe('ConfirmAccountService', () => {
  let service: ConfirmAccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfirmAccountService],
    }).compile();

    service = module.get<ConfirmAccountService>(ConfirmAccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
