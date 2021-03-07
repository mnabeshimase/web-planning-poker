import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { User } from 'src/graphql';
import { RoomsService } from 'src/rooms/rooms.service';

@Injectable()
export class UsersService {
  private users: User[] = [];
  constructor(private roomsService: RoomsService) {}

  create(name: string, roomId?: string): User {
    const userId = uuidv4();
    if (!roomId) {
      const room = this.roomsService.create(userId);
      roomId = room.id;
    }

    const user = { id: userId, name, roomId };
    this.users.push(user);
    return user;
  }

  listByRoomId(id: string): User[] {
    return this.users.filter((user) => user.roomId === id);
  }

  delete(id: string): User {
    const deletedUser = this.users.find((user) => user.id === id);
    if (!deletedUser) {
      throw new NotFoundException('user does not exist');
    }
    this.users = this.users.filter((user) => user !== deletedUser);
    return deletedUser;
  }
}
