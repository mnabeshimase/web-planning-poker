import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { Phase, Room, UpdateRoomInput } from 'src/graphql';

@Injectable()
export class RoomsService {
  private rooms: Room[] = [];
  get(id: string): Room {
    const room = this.rooms.find((room) => room.id === id);
    if (!room) {
      throw new NotFoundException();
    }
    return room;
  }

  create(hostUserId: string): Room {
    const room = { id: uuidv4(), hostUserId, phase: Phase.INIT };
    this.rooms = [...this.rooms, room];
    return room;
  }

  update(updateRoomInput: UpdateRoomInput): Room {
    const roomIdx = this.rooms.findIndex(
      (room) => room.id === updateRoomInput.id,
    );
    if (roomIdx < 0) {
      throw new NotFoundException();
    }
    this.rooms[roomIdx] = {
      ...this.rooms[roomIdx],
      ...updateRoomInput,
    };

    return this.rooms[roomIdx];
  }
}
