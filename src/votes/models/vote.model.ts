import { ObjectType, Field, InputType, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Vote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Field(() => ID)
  userId: string;

  @Column()
  @Field(() => ID)
  storyId: string;

  @Column()
  @Field()
  score: string;
}

@InputType()
export class UpsertVoteInput {
  @Field(() => ID)
  userId: string;

  @Field(() => ID)
  storyId: string;

  @Field()
  score: string;
}
