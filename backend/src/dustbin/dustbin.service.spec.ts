import { Test, TestingModule } from '@nestjs/testing';
import { DustbinService } from './dustbin.service';

describe('DustbinService', () => {
  let service: DustbinService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DustbinService],
    }).compile();

    service = module.get<DustbinService>(DustbinService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
