import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { Console } from 'node:console';
import { UpsertVoteInput, Vote } from 'src/graphql';
import { StoriesService } from 'src/stories/stories.service';
import { VotesService } from './votes.service';

const VOTE_UPSERTED = 'voteUpserted';

// TODO: inject pubsub as dependency
const pubSub = new PubSub();

@Resolver('Vote')
export class VotesResolver {
  constructor(
    private votesService: VotesService,
    private storiesService: StoriesService,
  ) {}
  @Mutation('upsertVote')
  upsert(@Args('upsertVoteInput') upsertVoteInput: UpsertVoteInput): Vote {
    const vote = this.votesService.upsert(upsertVoteInput);
    pubSub.publish(VOTE_UPSERTED, { voteUpserted: vote });
    return vote;
  }

  @Query('listVotesByStoryId')
  listVotesByStoryId(@Args('id') id: string) {
    return this.votesService.listVotesByStoryId(id);
  }

  @Subscription(() => Vote, {
    filter(this: VotesResolver, payload, variables) {
      const {
        voteUpserted: { storyId },
      } = payload;
      const { roomId } = this.storiesService.get(storyId);
      return roomId === variables.roomId;
    },
  })
  voteUpserted() {
    return pubSub.asyncIterator(VOTE_UPSERTED);
  }
}
