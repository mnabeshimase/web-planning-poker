import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { User } from './models/user.model';
import { RoomsService } from 'src/rooms/rooms.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private roomsService: RoomsService,
  ) {}

  async get(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (user) {
      throw new NotFoundException();
    }
    return user;
  }

  async create(name: string, roomId?: string): Promise<User> {
    if (!roomId) {
      const room = await this.roomsService.create();
      roomId = room.id;
    }

    const user = this.userRepository.create({ name, roomId });
    return this.userRepository.save(user);
  }

  listByRoomId(id: string): Promise<User[]> {
    return this.userRepository.find({ where: { roomId: id } });
  }

  async delete(id: string): Promise<User> {
    const user = await this.get(id);
    return this.userRepository.remove(user);
  }
}
