import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UpsertVoteInput, Vote } from 'src/graphql';
import { VotesService } from './votes.service';

@Resolver()
export class VotesResolver {
  constructor(private votesService: VotesService) {}
  @Mutation('upsertVote')
  upsert(@Args('upsertVoteInput') upsertVoteInput: UpsertVoteInput): Vote {
    return this.votesService.upsert(upsertVoteInput);
  }

  @Query('listVotesByRoomId')
  listVotesByRoomId(@Args('id') id: string) {
    return this.votesService.listVotesByRoomId(id);
  }
}
