import {
  Args,
  Resolver,
  Query,
  Mutation,
  ResolveField,
  Parent,
} from '@nestjs/graphql';

import { UsersService } from 'src/users/users.service';
import { RoomsService } from './rooms.service';
import { Room, User } from '../graphql';

@Resolver('Room')
export class RoomsResolver {
  constructor(
    private roomsService: RoomsService,
    private usersService: UsersService,
  ) {}

  @Query('room')
  get(@Args('id') id: string): Room {
    return this.roomsService.get(id);
  }

  @Mutation('createRoom')
  create(): Room {
    return this.roomsService.create();
  }

  @ResolveField()
  users(@Parent() room: Room): User[] {
    const { id } = room;
    return this.usersService.listByRoomId(id);
  }
}
