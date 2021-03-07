import { Injectable } from '@nestjs/common';
import { Story } from 'src/graphql';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class StoriesService {
  private stories: Story[] = [];

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
