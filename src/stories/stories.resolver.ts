import { Args, Query, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { Story } from 'src/graphql';
import { StoriesService } from './stories.service';

const STORY_CREATED = 'storyCreated';

// TODO: inject pubsub as dependency
const pubSub = new PubSub();

@Resolver()
export class StoriesResolver {
  constructor(private storiesService: StoriesService) {}

  @Query('listStoriesByRoomId')
  listStoriesByRoomId(@Args('id') id: string) {
    return this.storiesService.listStoriesByRoomId(id);
  }

  @Mutation('createStory')
  create(
    @Args('roomId') roomId: string,
    @Args('description') description: string,
  ): Story {
    const story = this.storiesService.create(roomId, description);
    pubSub.publish(STORY_CREATED, { storyCreated: story });
    return story;
  }

  @Subscription()
  storyCreated() {
    return pubSub.asyncIterator(STORY_CREATED);
  }
}
