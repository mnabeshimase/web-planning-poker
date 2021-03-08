import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Story } from './models/story.model';

@Injectable()
export class StoriesService {
  constructor(
    @InjectRepository(Story) private storyRepository: Repository<Story>,
  ) {}

  async get(id: string): Promise<Story> {
    const story = await this.storyRepository.findOne(id);
    if (!story) {
      throw new NotFoundException();
    }
    return story;
  }

  listStoriesByRoomId(id: string): Promise<Story[]> {
    return this.storyRepository.find({ where: { roomId: id } });
  }

  create(roomId: string, description: string): Promise<Story> {
    const story = this.storyRepository.create({
      roomId,
      description,
    });
    return this.storyRepository.save(story);
  }
}
