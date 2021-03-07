import {
  Args,
  Resolver,
  Query,
  ResolveField,
  Parent,
  Subscription,
} from '@nestjs/graphql';

import { UsersService } from 'src/users/users.service';
import { RoomsService } from './rooms.service';
import { Room, User, Vote } from '../graphql';
import { VotesService } from 'src/votes/votes.service';
import { PubSub } from 'graphql-subscriptions';

const ROOM_UPDATED = 'roomUpdated';

// TODO: inject pubsub as dependency
const pubSub = new PubSub();
@Resolver('Room')
export class RoomsResolver {
  constructor(
    private roomsService: RoomsService,
    private usersService: UsersService,
    private votesService: VotesService,
  ) {}

  @Query('room')
  get(@Args('id') id: string): Room {
    return this.roomsService.get(id);
  }

  @Subscription()
  roomUpdated() {
    return pubSub.asyncIterator(ROOM_UPDATED);
  }

  @ResolveField()
  users(@Parent() room: Room): User[] {
    const { id } = room;
    return this.usersService.listByRoomId(id);
  }

  @ResolveField()
  votes(@Parent() room: Room): Vote[] {
    const { id } = room;
    return this.votesService.listVotesByRoomId(id);
  }
}
