import { ObjectType, Field, InputType, ID } from '@nestjs/graphql';
import { Vote } from 'src/votes/models/vote.model';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Story {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field(() => ID)
  roomId: string;

  @Column()
  @Field()
  description: string;

  @Field(() => [Vote], { nullable: true })
  votes?: Vote[];
}

@InputType()
export class UpdateStoryInput {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  roomId: string;

  @Field({ nullable: true })
  description: string;

  @Field(() => ID, { nullable: true })
  voteIds: string;
}
