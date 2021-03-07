import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class StoriesService {
  private stories = [];
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
