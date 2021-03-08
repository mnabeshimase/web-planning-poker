import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Room, Phase, UpdateRoomInput } from './models/room.model';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
  ) {}
  async get(id: string): Promise<Room> {
    const room = await this.roomRepository.findOne(id);
    if (!room) {
      throw new NotFoundException();
    }
    return room;
  }

  create(): Promise<Room> {
    const room = this.roomRepository.create({
      phase: Phase.INIT,
    });
    return this.roomRepository.save(room);
  }

  async update(updateRoomInput: UpdateRoomInput): Promise<Room> {
    const room = await this.roomRepository.preload(updateRoomInput);
    if (!room) {
      throw new NotFoundException();
    }
    return this.roomRepository.save(room);
  }
}
