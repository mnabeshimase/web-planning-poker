import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { PubSubEngine } from 'graphql-subscriptions';

import { User } from 'src/graphql';
import { UsersService } from './users.service';

const USER_CREATED = 'userCreated';
const USER_DELETED = 'userDeleted';

@Resolver('User')
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    @Inject('PUB_SUB') private pubSub: PubSubEngine,
  ) {}

  @Mutation('createUser')
  create(@Args('name') name: string, @Args('roomId') roomId?: string): User {
    const user = this.usersService.create(name, roomId);
    // TODO: Limit the scope of publish to the room
    this.pubSub.publish(USER_CREATED, { userCreated: user });
    return user;
  }

  @Mutation('deleteUser')
  delete(@Args('id') id: string): User {
    const deletedUser = this.usersService.delete(id);
    // TODO: Limit the scope of publish to the room
    this.pubSub.publish(USER_DELETED, { userDeleted: deletedUser });
    return deletedUser;
  }

  @Subscription(() => User, {
    filter: (payload, variables) => {
      return payload.userCreated.roomId === variables.roomId;
    },
  })
  userCreated() {
    return this.pubSub.asyncIterator(USER_CREATED);
  }

  @Subscription(() => User, {
    filter: (payload, variables) =>
      payload.userDeleted.roomId === variables.roomId,
  })
  userDeleted() {
    return this.pubSub.asyncIterator(USER_DELETED);
  }
}
