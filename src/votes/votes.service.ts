import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UpsertVoteInput, Vote } from './models/vote.model';

@Injectable()
export class VotesService {
  constructor(
    @InjectRepository(Vote) private voteRepository: Repository<Vote>,
  ) {}
  async upsert(upsertVoteInput: UpsertVoteInput): Promise<Vote> {
    const oldVote = await this.voteRepository.findOne({
      where: {
        userId: upsertVoteInput.userId,
        storyId: upsertVoteInput.storyId,
      },
    });
    const vote = this.voteRepository.create({
      ...oldVote,
      ...upsertVoteInput,
    });
    return this.voteRepository.save(vote);
  }

  listVotesByStoryId(id: string): Promise<Vote[]> {
    return this.voteRepository.find({ where: { storyId: id } });
  }
}
