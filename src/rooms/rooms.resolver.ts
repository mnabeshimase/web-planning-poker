import {
  Args,
  Resolver,
  Query,
  ResolveField,
  Parent,
  Subscription,
  Mutation,
  ID,
} from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { PubSubEngine } from 'graphql-subscriptions';

import { RoomsService } from './rooms.service';
import { StoriesService } from '../stories/stories.service';
import { UsersService } from '../users/users.service';
import { Room, UpdateRoomInput } from './models/room.model';
import { Story } from '../stories/models/story.model';
import { User } from '../users/models/user.model';

const ROOM_UPDATED = 'roomUpdated';

@Resolver(() => Room)
export class RoomsResolver {
  constructor(
    private roomsService: RoomsService,
    private usersService: UsersService,
    private storiesService: StoriesService,
    @Inject('PUB_SUB') private pubSub: PubSubEngine,
  ) {}

  @Query(() => Room)
  room(@Args('id', { type: () => ID }) id: string): Promise<Room> {
    return this.roomsService.get(id);
  }

  @Mutation(() => Room)
  async updateRoom(
    @Args('updateRoomInput') updateRoomInput: UpdateRoomInput,
  ): Promise<Room> {
    const room = await this.roomsService.update(updateRoomInput);
    await this.pubSub.publish(ROOM_UPDATED, { roomUpdated: room });
    return room;
  }

  @Subscription(() => Room, {
    filter: (payload, variables) => payload.roomUpdated.id === variables.roomId,
  })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  roomUpdated(@Args('roomId', { type: () => ID }) roomId: string) {
    return this.pubSub.asyncIterator(ROOM_UPDATED);
  }

  @ResolveField('users', () => [User])
  users(@Parent() room: Room) {
    const { id } = room;
    return this.usersService.listByRoomId(id);
  }

  @ResolveField('stories', () => [Story])
  stories(@Parent() room: Room) {
    const { id } = room;
    return this.storiesService.listStoriesByRoomId(id);
  }
}
