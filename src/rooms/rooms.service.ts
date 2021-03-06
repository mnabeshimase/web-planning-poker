import { Injectable } from '@nestjs/common';
import { Room } from 'src/graphql';

import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RoomsService {
  private rooms = [];
  get(id: string): Room {
    return { id };
  }

  create(): Room {
    const room = { id: uuidv4() };
    this.rooms = [this.rooms, room];
    return room;
  }
}
