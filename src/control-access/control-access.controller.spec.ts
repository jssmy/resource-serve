import { Test, TestingModule } from '@nestjs/testing';
import { ControlAccessController } from './control-access.controller';

describe('ControlAccessController', () => {
  let controller: ControlAccessController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ControlAccessController],
    }).compile();

    controller = module.get<ControlAccessController>(ControlAccessController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
