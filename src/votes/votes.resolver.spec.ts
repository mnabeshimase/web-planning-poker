import { Test, TestingModule } from '@nestjs/testing';
import { StoriesService } from '../stories/stories.service';
import { VotesResolver } from './votes.resolver';
import { VotesService } from './votes.service';

describe('VotesResolver', () => {
  let resolver: VotesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VotesResolver,
        {
          provide: VotesService,
          useValue: {},
        },
        {
          provide: StoriesService,
          useValue: {},
        },
        {
          provide: 'PUB_SUB',
          useValue: {},
        },
      ],
    }).compile();

    resolver = module.get<VotesResolver>(VotesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
