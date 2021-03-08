import {
  Args,
  Resolver,
  Query,
  ResolveField,
  Parent,
  Subscription,
  Mutation,
} from '@nestjs/graphql';

import { Room, User, Vote, UpdateRoomInput, Story } from '../graphql';
import { UsersService } from 'src/users/users.service';
import { RoomsService } from './rooms.service';
import { VotesService } from 'src/votes/votes.service';
import { PubSub } from 'graphql-subscriptions';
import { StoriesService } from 'src/stories/stories.service';

const ROOM_UPDATED = 'roomUpdated';

// TODO: inject pubsub as dependency
const pubSub = new PubSub();
@Resolver('Room')
export class RoomsResolver {
  constructor(
    private roomsService: RoomsService,
    private usersService: UsersService,
    private votesService: VotesService,
    private storiesService: StoriesService,
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

  @Subscription(() => Room, {
    filter: (payload, variables) => payload.roomUpdated.id === variables.roomId,
  })
  roomUpdated() {
    return pubSub.asyncIterator(ROOM_UPDATED);
  }

  @ResolveField()
  users(@Parent() room: Room): User[] {
    const { id } = room;
    return this.usersService.listByRoomId(id);
  }

  @ResolveField()
  stories(@Parent() room: Room): Story[] {
    const { id } = room;
    return this.storiesService.listStoriesByRoomId(id);
  }
}
