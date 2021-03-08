import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UpsertVoteInput, Vote } from './models/vote.model';

@Injectable()
export class VotesService {
  constructor(
    @InjectRepository(Vote) private voteRepository: Repository<Vote>,
  ) {}
  upsert(upsertVoteInput: UpsertVoteInput): Promise<Vote> {
    const vote = this.voteRepository.create(upsertVoteInput);
    return this.voteRepository.save(vote);
  }

  listVotesByStoryId(id: string): Promise<Vote[]> {
    return this.voteRepository.find({ where: { storyId: id } });
  }
}
