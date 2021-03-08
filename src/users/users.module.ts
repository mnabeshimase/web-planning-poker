import { forwardRef, Module } from '@nestjs/common';

import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { pubSubFactory } from '../pubsub-factory';
import { RoomsModule } from 'src/rooms/rooms.module';

@Module({
  imports: [forwardRef(() => RoomsModule)],
  providers: [UsersResolver, UsersService, pubSubFactory],
  exports: [UsersService],
})
export class UsersModule {}
