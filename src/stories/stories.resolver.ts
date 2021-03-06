import { Inject } from '@nestjs/common';
import {
  Args,
  Query,
  Mutation,
  Resolver,
  Subscription,
  ResolveField,
  Parent,
  ID,
} from '@nestjs/graphql';
import { PubSubEngine } from 'graphql-subscriptions';

import { Story } from './models/story.model';
import { Vote } from '../votes/models/vote.model';
import { VotesService } from '../votes/votes.service';
import { StoriesService } from './stories.service';

const STORY_CREATED = 'storyCreated';

@Resolver(() => Story)
export class StoriesResolver {
  constructor(
    private storiesService: StoriesService,
    private votesService: VotesService,
    @Inject('PUB_SUB') private pubSub: PubSubEngine,
  ) {}

  @Query(() => [Story], { nullable: true })
  listStoriesByRoomId(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Story[]> {
    return this.storiesService.listStoriesByRoomId(id);
  }

  @Mutation(() => Story)
  async createStory(
    @Args('description') description: string,
    @Args('roomId', { type: () => ID }) roomId: string,
  ): Promise<Story> {
    const story = await this.storiesService.create(roomId, description);
    await this.pubSub.publish(STORY_CREATED, { storyCreated: story });
    return story;
  }

  @Subscription(() => Story, {
    filter: (payload, variables) => {
      return payload.storyCreated.roomId === variables.roomId;
    },
  })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  storyCreated(@Args('roomId', { type: () => ID }) roomId: string) {
    return this.pubSub.asyncIterator(STORY_CREATED);
  }

  @ResolveField('votes', () => [Vote])
  votes(@Parent() story: Story): Promise<Vote[]> {
    const { id } = story;
    return this.votesService.listVotesByStoryId(id);
  }
}
