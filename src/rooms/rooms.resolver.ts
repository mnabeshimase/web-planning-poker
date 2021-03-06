import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';

import { RoomsService } from './rooms.service';
import { Room } from '../graphql';

@Resolver('Room')
export class RoomsResolver {
  constructor(private roomsService: RoomsService) {}

  @Query('room')
  get(@Args('id') id: string): Room {
    return this.roomsService.get(id);
  }

  @Mutation('createRoom')
  create(): Room {
    return this.roomsService.create();
  }
}
