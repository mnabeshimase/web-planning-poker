import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { Room } from 'src/graphql';

@Injectable()
export class RoomsService {
  private rooms: Room[] = [];
  get(id: string): Room {
    return { id };
  }

  create(hostUserId: string): Room {
    const room = { id: uuidv4(), hostUserId };
    this.rooms = [...this.rooms, room];
    return room;
  }
}
