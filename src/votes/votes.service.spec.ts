import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { createMockRepository, MockRepository } from '../../test/utils';
import { Vote } from './models/vote.model';
import { VotesService } from './votes.service';

describe('VotesService', () => {
  let service: VotesService;
  let voteRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VotesService,
        { provide: getRepositoryToken(Vote), useValue: createMockRepository() },
      ],
    }).compile();

    service = module.get<VotesService>(VotesService);
    voteRepository = module.get<MockRepository>(getRepositoryToken(Vote));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('upsert', () => {
    const id = 'id';
    const userId = 'userId';
    const storyId = 'storyId';
    const score = 'score';
    const upsertVoteInput = { id, userId, storyId, score };
    const vote = { id, userId, storyId, score };
    it('success', async () => {
      voteRepository.create.mockReturnValueOnce(upsertVoteInput);
      voteRepository.save.mockResolvedValueOnce(vote);

      const res = await service.upsert(upsertVoteInput);

      expect(res).toStrictEqual(vote);
      expect(voteRepository.create).toBeCalledWith(upsertVoteInput);
      expect(voteRepository.save).toBeCalledWith(upsertVoteInput);
    });
    it('throws on save error', async () => {
      voteRepository.create.mockReturnValueOnce(upsertVoteInput);
      voteRepository.save.mockRejectedValueOnce(new Error());

      await expect(service.upsert(upsertVoteInput)).rejects.toThrow();

      expect(voteRepository.create).toBeCalledWith(upsertVoteInput);
      expect(voteRepository.save).toBeCalledWith(upsertVoteInput);
    });
  });
  describe('listVotesByStoryId', () => {
    const storyId = 'storyId';
    const vote = {
      id: 'id',
      storyId,
    };
    it('success', async () => {
      voteRepository.find.mockResolvedValueOnce([vote]);

      const res = await service.listVotesByStoryId(storyId);

      expect(res).toStrictEqual([vote]);
      expect(voteRepository.find).toBeCalledWith({ where: { storyId } });
    });
  });
});
