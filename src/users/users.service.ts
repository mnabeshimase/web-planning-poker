import { Injectable } from '@nestjs/common';
import { User } from 'src/graphql';

@Injectable()
export class UsersService {
  private users: User[] = [];

  create(name: string, roomId: string): User {
    const user = { name, roomId };
    this.users.push(user);
    return user;
  }

  listByRoomId(id: string): User[] {
    return this.users.filter((user) => user.roomId === id);
  }
}
