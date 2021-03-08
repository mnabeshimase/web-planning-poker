
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum Phase {
    INIT = "INIT",
    VOTE = "VOTE",
    DISCUSSION = "DISCUSSION"
}

export class UpdateRoomInput {
    id: string;
    userIds?: string[];
    phase?: Phase;
    currentStoryId?: string;
}

export class UpdateStoryInput {
    id: string;
    roomId: string;
    description?: string;
    voteIds?: string[];
}

export class UpsertVoteInput {
    userId: string;
    storyId: string;
    score: string;
}

export abstract class IQuery {
    abstract room(id: string): Room | Promise<Room>;

    abstract listStoriesByRoomId(id: string): Story[] | Promise<Story[]>;

    abstract listVotesByStoryId(id: string): Vote[] | Promise<Vote[]>;
}

export abstract class IMutation {
    abstract updateRoom(updateRoomInput: UpdateRoomInput): Room | Promise<Room>;

    abstract createStory(roomId: string, description: string): Story | Promise<Story>;

    abstract updateStory(updateStoryInput?: UpdateStoryInput): Story | Promise<Story>;

    abstract createUser(name: string, roomId?: string): User | Promise<User>;

    abstract deleteUser(id: string): User | Promise<User>;

    abstract upsertVote(upsertVoteInput: UpsertVoteInput): Vote | Promise<Vote>;
}

export abstract class ISubscription {
    abstract roomUpdated(roomId: string): Room | Promise<Room>;

    abstract storyCreated(roomId: string): Story | Promise<Story>;

    abstract userCreated(roomId: string): User | Promise<User>;

    abstract userDeleted(roomId: string): User | Promise<User>;

    abstract voteUpserted(roomId: string): Vote | Promise<Vote>;
}

export class Room {
    id: string;
    users?: User[];
    phase: Phase;
    stories?: Story[];
    currentStoryId?: string;
}

export class Story {
    id: string;
    roomId: string;
    description: string;
    votes?: Vote[];
}

export class User {
    id: string;
    name: string;
    roomId: string;
}

export class Vote {
    userId: string;
    storyId: string;
    score: string;
}
