import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { Story } from './models/story.model';

@Injectable()
export class StoriesService {
  private stories: Story[] = [];

  get(id: string) {
    const story = this.stories.find((story) => story.id === id);
    if (!story) {
      throw new NotFoundException();
    }
    return story;
  }

  listStoriesByRoomId(id: string) {
    return this.stories.filter((story) => story.roomId === id);
  }

  create(roomId: string, description: string) {
    const story = {
      id: uuidv4(),
      roomId,
      description,
    };
    this.stories.push(story);
    return story;
  }
}
