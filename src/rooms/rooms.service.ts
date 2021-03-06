import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { Room } from 'src/graphql';

@Injectable()
export class RoomsService {
  private rooms: Room[] = [];
  get(id: string): Room {
    return { id };
  }

  create(): Room {
    const room = { id: uuidv4(), users: [] };
    this.rooms = [...this.rooms, room];
    return room;
  }
}
