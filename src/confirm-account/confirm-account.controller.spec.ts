import { Test, TestingModule } from '@nestjs/testing';
import { ConfirmAccountController } from './confirm-account.controller';
import { ConfirmAccountService } from './confirm-account.service';

describe('ConfirmAccountController', () => {
  let controller: ConfirmAccountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConfirmAccountController],
      providers: [ConfirmAccountService],
    }).compile();

    controller = module.get<ConfirmAccountController>(ConfirmAccountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
