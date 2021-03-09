import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { createMockRepository, MockRepository } from '../../test/utils';
import { RoomsService } from '../rooms/rooms.service';
import { User } from './models/user.model';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: createMockRepository(),
        },
        {
          provide: RoomsService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<MockRepository>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('get', () => {
    const id = 'id';
    const user = { id };
    it('success', async () => {
      userRepository.findOne.mockResolvedValueOnce(user);

      const res = await service.get(id);

      expect(res).toStrictEqual(user);
      expect(userRepository.findOne).toBeCalledWith(id);
    });
    it('throws not found error', async () => {
      userRepository.findOne.mockResolvedValueOnce(undefined);

      await expect(service.get(id)).rejects.toThrow();

      expect(userRepository.findOne).toBeCalledWith(id);
    });
  });

  describe('create', () => {
    const id = 'id';
    const name = 'name';
    const roomId = 'roomId';
    const user = { id, name, roomId };
    it('success', async () => {
      userRepository.create.mockReturnValueOnce({ name, roomId });
      userRepository.save.mockResolvedValueOnce(user);

      const res = await service.create(name, roomId);

      expect(res).toStrictEqual(user);
      expect(userRepository.create).toBeCalledWith({ name, roomId });
      expect(userRepository.save).toBeCalledWith({ name, roomId });
    });
    it('throws on save error', async () => {
      userRepository.create.mockReturnValueOnce({ name, roomId });
      userRepository.save.mockRejectedValueOnce(new Error());

      await expect(service.create(name, roomId)).rejects.toThrow();

      expect(userRepository.create).toBeCalledWith({ name, roomId });
      expect(userRepository.save).toBeCalledWith({ name, roomId });
    });
  });

  describe('listByRoomId', () => {
    const id = 'id';
    const roomId = 'roomId';
    const user = { id, roomId };
    it('success', async () => {
      userRepository.find.mockResolvedValueOnce([user]);

      const res = await service.listByRoomId(roomId);

      expect(res).toStrictEqual([user]);
      expect(userRepository.find).toBeCalledWith({ where: { roomId } });
    });
  });

  describe('delete', () => {
    const id = 'id';
    const roomId = 'roomId';
    const user = { id, roomId };
    it('success', async () => {
      userRepository.findOne.mockResolvedValueOnce(user);
      userRepository.remove.mockResolvedValueOnce(user);

      const res = await service.delete(id);

      expect(res).toStrictEqual(user);
      expect(userRepository.findOne).toBeCalledWith(id);
      expect(userRepository.remove).toBeCalledWith(user);
    });
    it('throws on remove error', async () => {
      userRepository.findOne.mockResolvedValueOnce(user);
      userRepository.remove.mockRejectedValueOnce(new Error());

      await expect(service.delete(id)).rejects.toThrow();

      expect(userRepository.findOne).toBeCalledWith(id);
      expect(userRepository.remove).toBeCalledWith(user);
    });
  });
});
