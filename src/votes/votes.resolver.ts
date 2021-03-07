import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { UpsertVoteInput, Vote } from 'src/graphql';
import { VotesService } from './votes.service';

const VOTE_UPSERTED = 'voteUpserted';

// TODO: inject pubsub as dependency
const pubSub = new PubSub();

@Resolver()
export class VotesResolver {
  constructor(private votesService: VotesService) {}
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

  @Subscription()
  voteUpserted() {
    return pubSub.asyncIterator(VOTE_UPSERTED);
  }
}
