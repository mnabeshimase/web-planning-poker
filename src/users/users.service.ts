import { Injectable, NotFoundException } from '@nestjs/common';
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

  delete(name: string, roomId: string): User {
    const deletedUser = this.users.find(
      (user) => user.name === name && user.roomId === roomId,
    );
    if (!deletedUser) {
      throw new NotFoundException('user does not exist');
    }
    this.users = this.users.filter((user) => user !== deletedUser);
    return deletedUser;
  }
}
