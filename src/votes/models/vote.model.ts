import { ObjectType, Field, InputType, ID } from '@nestjs/graphql';

@ObjectType()
export class Vote {
  @Field(() => ID)
  userId: string;

  @Field(() => ID)
  storyId: string;

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
