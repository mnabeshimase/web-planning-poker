import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { cwd } from 'process';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomsResolver } from './rooms/rooms.resolver';
import { RoomsService } from './rooms/rooms.service';
import { UsersResolver } from './users/users.resolver';
import { UsersService } from './users/users.service';

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
  ],
})
export class AppModule {}
