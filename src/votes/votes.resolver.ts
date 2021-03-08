import { Inject } from '@nestjs/common';
import {
  Args,
  ID,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { PubSubEngine } from 'graphql-subscriptions';

import { Vote, UpsertVoteInput } from './models/vote.model';
import { StoriesService } from 'src/stories/stories.service';
import { VotesService } from './votes.service';

const VOTE_UPSERTED = 'voteUpserted';

@Resolver(() => Vote)
export class VotesResolver {
  constructor(
    private votesService: VotesService,
    private storiesService: StoriesService,
    @Inject('PUB_SUB') private pubSub: PubSubEngine,
  ) {}

  @Mutation(() => Vote)
  async upsertVote(
    @Args('upsertVoteInput') upsertVoteInput: UpsertVoteInput,
  ): Promise<Vote> {
    const vote = await this.votesService.upsert(upsertVoteInput);
    await this.pubSub.publish(VOTE_UPSERTED, { voteUpserted: vote });
    return vote;
  }

  @Query(() => [Vote], { nullable: true })
  listVotesByStoryId(@Args('id', { type: () => ID }) id: string) {
    return this.votesService.listVotesByStoryId(id);
  }

  @Subscription(() => Vote, {
    async filter(this: VotesResolver, payload, variables) {
      const {
        voteUpserted: { storyId },
      } = payload;
      const { roomId } = await this.storiesService.get(storyId);
      return roomId === variables.roomId;
    },
  })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  voteUpserted(@Args('roomId', { type: () => ID }) roomId: string) {
    return this.pubSub.asyncIterator(VOTE_UPSERTED);
  }
}
