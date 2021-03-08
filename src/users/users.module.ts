import { forwardRef, Module } from '@nestjs/common';

import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { pubSubFactory } from '../pubsub-factory';
import { RoomsModule } from 'src/rooms/rooms.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.model';

@Module({
  imports: [forwardRef(() => RoomsModule), TypeOrmModule.forFeature([User])],
  providers: [UsersResolver, UsersService, pubSubFactory],
  exports: [UsersService],
})
export class UsersModule {}
