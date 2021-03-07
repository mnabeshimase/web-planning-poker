import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { StoriesService } from './stories.service';

@Resolver()
export class StoriesResolver {
  constructor(private storiesService: StoriesService) {}

  @Mutation('createStory')
  create(
    @Args('roomId') roomId: string,
    @Args('description') description: string,
  ) {
    return this.storiesService.create(roomId, description);
  }
}
