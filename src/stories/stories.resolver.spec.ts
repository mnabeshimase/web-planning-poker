import { Test, TestingModule } from '@nestjs/testing';
import { pubSubToken } from '../pubsub-factory';
import { VotesService } from '../votes/votes.service';
import { StoriesResolver } from './stories.resolver';
import { StoriesService } from './stories.service';

describe('StoriesResolver', () => {
  let resolver: StoriesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StoriesResolver,
        {
          provide: StoriesService,
          useValue: {},
        },
        {
          provide: VotesService,
          useValue: {},
        },
        {
          provide: pubSubToken,
          useValue: {},
        },
      ],
    }).compile();

    resolver = module.get<StoriesResolver>(StoriesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
