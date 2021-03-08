import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { pubSubFactory } from 'src/pubsub-factory';
import { VotesModule } from 'src/votes/votes.module';
import { Story } from './models/story.model';
import { StoriesResolver } from './stories.resolver';
import { StoriesService } from './stories.service';

@Module({
  imports: [forwardRef(() => VotesModule), TypeOrmModule.forFeature([Story])],
  providers: [StoriesResolver, StoriesService, pubSubFactory],
  exports: [StoriesService],
})
export class StoriesModule {}
