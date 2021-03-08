import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { pubSubFactory } from 'src/pubsub-factory';
import { StoriesModule } from 'src/stories/stories.module';
import { UsersModule } from 'src/users/users.module';
import { Room } from './models/room.model';
import { RoomsResolver } from './rooms.resolver';
import { RoomsService } from './rooms.service';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    StoriesModule,
    TypeOrmModule.forFeature([Room]),
  ],
  providers: [RoomsResolver, RoomsService, pubSubFactory],
  exports: [RoomsService],
})
export class RoomsModule {}
