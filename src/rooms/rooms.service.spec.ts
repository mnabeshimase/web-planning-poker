import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Phase, Room } from './models/room.model';
import { RoomsService } from './rooms.service';
import { MockRepository, createMockRepository } from '../../test/utils';

describe('RoomsService', () => {
  let service: RoomsService;
  let roomRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoomsService,
        {
          provide: getRepositoryToken(Room),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<RoomsService>(RoomsService);
    roomRepository = module.get<MockRepository>(getRepositoryToken(Room));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe.skip('get', () => {
    const id = 'id';
    const room = { id };
    it('success', async () => {
      roomRepository.findOne.mockResolvedValueOnce(room);

      const res = await service.get(id);

      expect(res).toStrictEqual(room);
      expect(roomRepository.findOne).toBeCalledWith(id);
    });
    it('throws not found error', async () => {
      roomRepository.findOne.mockResolvedValueOnce(undefined);

      await expect(service.get(id)).rejects.toThrow();

      expect(roomRepository.findOne).toBeCalledWith(id);
    });
  });

  describe('create', () => {
    const id = 'id';
    const room = { id, phase: Phase.INIT };
    it('success', async () => {
      roomRepository.create.mockReturnValueOnce({ phase: Phase.INIT });
      roomRepository.save.mockResolvedValueOnce(room);

      const res = await service.create();

      expect(res).toStrictEqual(room);
      expect(roomRepository.create).toBeCalledWith({ phase: Phase.INIT });
    });
    it('throws on save error', async () => {
      roomRepository.create.mockReturnValueOnce({ phase: Phase.INIT });
      roomRepository.save.mockRejectedValueOnce(new Error());

      await expect(service.create()).rejects.toThrow();

      expect(roomRepository.create).toBeCalledWith({ phase: Phase.INIT });
      expect(roomRepository.save).toBeCalledWith({ phase: Phase.INIT });
    });
  });

  describe('update', () => {
    const id = 'id';
    const updateRoomInput = { id, phase: Phase.VOTE };
    const room = { id, phase: Phase.INIT };
    it('success', async () => {
      roomRepository.preload.mockResolvedValueOnce(room);
      roomRepository.save.mockResolvedValueOnce(room);

      const res = await service.update(updateRoomInput);

      expect(res).toStrictEqual(room);
      expect(roomRepository.preload).toBeCalledWith(updateRoomInput);
      expect(roomRepository.save).toBeCalledWith(room);
    });
    it('throws not found error', async () => {
      roomRepository.preload.mockResolvedValueOnce(undefined);

      await expect(service.update(updateRoomInput)).rejects.toThrow();

      expect(roomRepository.preload).toBeCalledWith(updateRoomInput);
    });
    it('throws on save error', async () => {
      roomRepository.preload.mockResolvedValueOnce(room);
      roomRepository.save.mockRejectedValueOnce(new Error());

      await expect(service.update(updateRoomInput)).rejects.toThrow();

      expect(roomRepository.preload).toBeCalledWith(updateRoomInput);
      expect(roomRepository.save).toBeCalledWith(room);
    });
  });
});
