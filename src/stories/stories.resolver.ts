import { Inject } from '@nestjs/common';
import {
  Args,
  Query,
  Mutation,
  Resolver,
  Subscription,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { PubSubEngine } from 'graphql-subscriptions';

import { Story, Vote } from 'src/graphql';
import { VotesService } from 'src/votes/votes.service';
import { StoriesService } from './stories.service';

const STORY_CREATED = 'storyCreated';

@Resolver('Story')
export class StoriesResolver {
  constructor(
    private storiesService: StoriesService,
    private votesService: VotesService,
    @Inject('PUB_SUB') private pubSub: PubSubEngine,
  ) {}

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
    this.pubSub.publish(STORY_CREATED, { storyCreated: story });
    return story;
  }

  @Subscription(() => Story, {
    filter: (payload, variables) => {
      return payload.storyCreated.roomId === variables.roomId;
    },
  })
  storyCreated() {
    return this.pubSub.asyncIterator(STORY_CREATED);
  }

  @ResolveField()
  votes(@Parent() story: Story): Vote[] {
    const { id } = story;
    return this.votesService.listVotesByStoryId(id);
  }
}
