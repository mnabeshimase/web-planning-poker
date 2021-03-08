import { Test, TestingModule } from '@nestjs/testing';
import { pubSubToken } from '../pubsub-factory';
import { StoriesService } from '../stories/stories.service';
import { UsersService } from '../users/users.service';
import { RoomsResolver } from './rooms.resolver';

describe('RoomsResolver', () => {
  let resolver: RoomsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoomsResolver,
        {
          provide: RoomsResolver,
          useValue: {},
        },
        {
          provide: UsersService,
          useValue: {},
        },
        {
          provide: StoriesService,
          useValue: {},
        },

        {
          provide: pubSubToken,
          useValue: {},
        },
      ],
    }).compile();

    resolver = module.get<RoomsResolver>(RoomsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
