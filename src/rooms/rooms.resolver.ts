import {
  Args,
  Resolver,
  Query,
  ResolveField,
  Parent,
  Subscription,
  Mutation,
} from '@nestjs/graphql';

import { Room, User, Vote, UpdateRoomInput } from '../graphql';
import { UsersService } from 'src/users/users.service';
import { RoomsService } from './rooms.service';
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

  @Mutation('updateRoom')
  update(@Args('updateRoomInput') updateRoomInput: UpdateRoomInput): Room {
    const room = this.roomsService.update(updateRoomInput);
    pubSub.publish(ROOM_UPDATED, { roomUpdated: room });
    return room;
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
