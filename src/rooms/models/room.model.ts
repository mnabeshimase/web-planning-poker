import {
  ObjectType,
  Field,
  registerEnumType,
  InputType,
  ID,
} from '@nestjs/graphql';
import { Story } from 'src/stories/models/story.model';
import { User } from 'src/users/models/user.model';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum Phase {
  INIT,
  VOTE,
  DISCUSSION,
}

registerEnumType(Phase, {
  name: 'Phase',
});

@Entity()
@ObjectType()
export class Room {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field(() => Phase)
  phase: Phase;

  @Column({ nullable: true })
  @Field(() => ID, { nullable: true })
  currentStoryId?: string;

  @Field(() => [User], { nullable: true })
  users?: User[];

  @Field(() => [Story], { nullable: true })
  stories?: Story[];
}

@InputType()
export class UpdateRoomInput {
  @Field(() => ID)
  id: string;

  @Field(() => [ID], { nullable: true })
  userIds?: string[];

  @Field(() => Phase, { nullable: true })
  phase?: Phase;

  @Field(() => ID, { nullable: true })
  currentStoryId?: string;
}
