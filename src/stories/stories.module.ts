import { forwardRef, Module } from '@nestjs/common';
import { pubSubFactory } from 'src/pubsub-factory';
import { VotesModule } from 'src/votes/votes.module';
import { StoriesResolver } from './stories.resolver';
import { StoriesService } from './stories.service';

@Module({
  imports: [forwardRef(() => VotesModule)],
  providers: [StoriesResolver, StoriesService, pubSubFactory],
  exports: [StoriesService],
})
export class StoriesModule {}
