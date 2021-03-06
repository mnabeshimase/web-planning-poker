import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { cwd } from 'process';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomsResolver } from './rooms/rooms.resolver';
import { RoomsService } from './rooms/rooms.service';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      definitions: { path: join(cwd(), 'src/graphql.ts') },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, RoomsResolver, RoomsService],
})
export class AppModule {}
