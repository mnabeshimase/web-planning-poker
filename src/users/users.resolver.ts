import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { User } from 'src/graphql';
import { UsersService } from './users.service';

// TODO: inject pubsub as dependency
const pubSub = new PubSub();

const USER_CREATED = 'userCreated';

@Resolver('User')
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Mutation('createUser')
  create(@Args('name') name: string, @Args('roomId') roomId: string): User {
    const user = this.usersService.create(name, roomId);
    // TODO: Limit the scope of publish to the room
    pubSub.publish(USER_CREATED, { userCreated: user });
    return user;
  }

  @Subscription()
  userCreated() {
    return pubSub.asyncIterator(USER_CREATED);
  }
}
