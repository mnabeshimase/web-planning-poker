import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis from 'ioredis';
import { join } from 'path';
import { cwd } from 'process';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomsResolver } from './rooms/rooms.resolver';
import { RoomsService } from './rooms/rooms.service';
import { UsersResolver } from './users/users.resolver';
import { UsersService } from './users/users.service';
import { VotesResolver } from './votes/votes.resolver';
import { VotesService } from './votes/votes.service';
import { StoriesResolver } from './stories/stories.resolver';
import { StoriesService } from './stories/stories.service';

@Module({
  imports: [
    GraphQLModule.forRoot({
      definitions: {
        outputAs: 'class',
        path: join(cwd(), 'src/graphql.ts'),
      },
      installSubscriptionHandlers: true,
      typePaths: ['./**/*.graphql'],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    RoomsResolver,
    RoomsService,
    UsersResolver,
    UsersService,
    VotesResolver,
    VotesService,
    StoriesResolver,
    StoriesService,
    {
      provide: 'PUB_SUB',
      useFactory: () => {
        const options = {
          host: 'localhost',
          port: 6379,
        };
        return new RedisPubSub({
          publisher: new Redis(options),
          subscriber: new Redis(options),
        });
      },
    },
  ],
})
export class AppModule {}
