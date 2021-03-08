import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { join } from 'path';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { VotesModule } from './votes/votes.module';
import { RoomsModule } from './rooms/rooms.module';
import { StoriesModule } from './stories/stories.module';
import { pubSubFactory } from './pubsub-factory';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      installSubscriptionHandlers: true,
    }),
    // TODO: use env vals and disable synchronize in prod
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'pass123',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    VotesModule,
    RoomsModule,
    StoriesModule,
  ],
  controllers: [],
  providers: [pubSubFactory],
})
export class AppModule {}
