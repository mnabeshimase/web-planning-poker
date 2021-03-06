import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { User } from 'src/graphql';

@Injectable()
export class UsersService {
  private users: User[] = [];

  create(name: string, roomId: string): User {
    const user = { id: uuidv4(), name, roomId };
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
