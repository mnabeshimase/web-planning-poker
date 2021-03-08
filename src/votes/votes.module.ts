import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { pubSubFactory } from 'src/pubsub-factory';
import { StoriesModule } from 'src/stories/stories.module';
import { Vote } from './models/vote.model';
import { VotesResolver } from './votes.resolver';
import { VotesService } from './votes.service';

@Module({
  imports: [forwardRef(() => StoriesModule), TypeOrmModule.forFeature([Vote])],
  providers: [VotesResolver, VotesService, pubSubFactory],
  exports: [VotesService],
})
export class VotesModule {}
