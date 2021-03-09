import { Inject } from '@nestjs/common';
import { Args, ID, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { PubSubEngine } from 'graphql-subscriptions';

import { User } from './models/user.model';
import { UsersService } from './users.service';

const USER_CREATED = 'userCreated';
const USER_DELETED = 'userDeleted';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    @Inject('PUB_SUB') private pubSub: PubSubEngine,
  ) {}

  @Mutation(() => User)
  async createUser(
    @Args('name') name: string,
    @Args('roomId', { type: () => ID, nullable: true }) roomId?: string,
  ): Promise<User> {
    const user = await this.usersService.create(name, roomId);
    await this.pubSub.publish(USER_CREATED, { userCreated: user });
    return user;
  }

  @Mutation(() => User)
  async deleteUser(@Args('id', { type: () => ID }) id: string): Promise<User> {
    const deletedUser = await this.usersService.delete(id);
    await this.pubSub.publish(USER_DELETED, { userDeleted: deletedUser });
    return deletedUser;
  }

  @Subscription(() => User, {
    filter: (payload, variables) => {
      return payload.userCreated.roomId === variables.roomId;
    },
  })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  userCreated(@Args('roomId', { type: () => ID }) roomId?: string) {
    return this.pubSub.asyncIterator(USER_CREATED);
  }

  @Subscription(() => User, {
    filter: (payload, variables) =>
      payload.userDeleted.roomId === variables.roomId,
  })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  userDeleted(@Args('roomId', { type: () => ID }) roomId: string) {
    return this.pubSub.asyncIterator(USER_DELETED);
  }
}
