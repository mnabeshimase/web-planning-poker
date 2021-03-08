import { forwardRef, Module } from '@nestjs/common';
import { pubSubFactory } from 'src/pubsub-factory';
import { StoriesModule } from 'src/stories/stories.module';
import { VotesResolver } from './votes.resolver';
import { VotesService } from './votes.service';

@Module({
  imports: [forwardRef(() => StoriesModule)],
  providers: [VotesResolver, VotesService, pubSubFactory],
  exports: [VotesService],
})
export class VotesModule {}
