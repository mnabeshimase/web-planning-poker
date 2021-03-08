import { Injectable } from '@nestjs/common';

import { UpsertVoteInput, Vote } from './models/vote.model';

@Injectable()
export class VotesService {
  private votes: Vote[] = [];
  upsert(upsertVoteInput: UpsertVoteInput): Vote {
    const oldVote = this.votes.find(
      (vote) =>
        vote.storyId === upsertVoteInput.storyId &&
        vote.userId === upsertVoteInput.userId,
    );
    if (oldVote) {
      oldVote.score = upsertVoteInput.score;
      return oldVote;
    }
    this.votes.push(upsertVoteInput);
    return upsertVoteInput;
  }

  listVotesByStoryId(id: string) {
    return this.votes.filter((vote) => vote.storyId === id);
  }
}
