import { Injectable } from '@nestjs/common';
import { UpsertVoteInput, Vote } from 'src/graphql';

@Injectable()
export class VotesService {
  private votes: Vote[] = [];
  upsert(upsertVoteInput: UpsertVoteInput): Vote {
    const oldVote = this.votes.find(
      (vote) =>
        vote.roomId === upsertVoteInput.roomId &&
        vote.userId === upsertVoteInput.userId,
    );
    if (oldVote) {
      oldVote.score = upsertVoteInput.score;
      return oldVote;
    }
    this.votes.push(upsertVoteInput);
    return upsertVoteInput;
  }

  listVotesByRoomId(id: string) {
    return this.votes.filter((vote) => vote.roomId === id);
  }
}
