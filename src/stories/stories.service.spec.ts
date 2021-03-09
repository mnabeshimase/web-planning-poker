import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { createMockRepository, MockRepository } from '../../test/utils';
import { Story } from './models/story.model';
import { StoriesService } from './stories.service';

describe('StoriesService', () => {
  let service: StoriesService;
  let storyRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StoriesService,
        {
          provide: getRepositoryToken(Story),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<StoriesService>(StoriesService);
    storyRepository = module.get<MockRepository>(getRepositoryToken(Story));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('get', () => {
    const id = 'id';
    const story = { id };
    it('success', async () => {
      storyRepository.findOne.mockResolvedValueOnce(story);

      const res = await service.get(id);

      expect(res).toStrictEqual(story);
      expect(storyRepository.findOne).toBeCalledWith(id);
    });
    it('throws not found error', async () => {
      storyRepository.findOne.mockResolvedValueOnce(undefined);

      await expect(service.get(id)).rejects.toThrow();

      expect(storyRepository.findOne).toBeCalledWith(id);
    });
  });

  describe('listStoriesByRoomId', () => {
    const id = 'id';
    const story = { id };
    it('success', async () => {
      storyRepository.find.mockResolvedValueOnce([story]);

      const res = await service.listStoriesByRoomId(id);

      expect(res).toStrictEqual([story]);
      expect(storyRepository.find).toBeCalledWith({ where: { roomId: id } });
    });
  });

  describe('create', () => {
    const id = 'id';
    const roomId = 'roomId';
    const description = 'description';
    const story = { id, roomId, description };
    it('success', async () => {
      storyRepository.create.mockReturnValueOnce({ roomId, description });
      storyRepository.save.mockResolvedValueOnce(story);

      const res = await service.create(roomId, description);

      expect(res).toStrictEqual(story);
      expect(storyRepository.create).toHaveBeenCalledWith({
        roomId,
        description,
      });
      expect(storyRepository.save).toHaveBeenCalledWith({
        roomId,
        description,
      });
    });
    it('throws on save error', async () => {
      storyRepository.create.mockReturnValueOnce({ roomId, description });
      storyRepository.save.mockRejectedValueOnce(new Error());

      await expect(service.create(roomId, description)).rejects.toThrow();

      expect(storyRepository.create).toHaveBeenCalledWith({
        roomId,
        description,
      });
      expect(storyRepository.save).toHaveBeenCalledWith({
        roomId,
        description,
      });
    });
  });
});
