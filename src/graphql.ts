
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
    voteIds?: string[];
    phase?: Phase;
}

export class UpsertVoteInput {
    userId: string;
    roomId: string;
    score: string;
}

export abstract class IQuery {
    abstract room(id: string): Room | Promise<Room>;

    abstract listStoriesByRoomId(id: string): Story[] | Promise<Story[]>;

    abstract listVotesByRoomId(id: string): Vote[] | Promise<Vote[]>;
}

export abstract class IMutation {
    abstract updateRoom(updateRoomInput: UpdateRoomInput): Room | Promise<Room>;

    abstract createStory(roomId: string, description: string): Story | Promise<Story>;

    abstract createUser(name: string, roomId?: string): User | Promise<User>;

    abstract deleteUser(id: string): User | Promise<User>;

    abstract upsertVote(upsertVoteInput: UpsertVoteInput): Vote | Promise<Vote>;
}

export abstract class ISubscription {
    abstract roomUpdated(): Room | Promise<Room>;

    abstract storyCreated(): Story | Promise<Story>;

    abstract userCreated(): User | Promise<User>;

    abstract userDeleted(): User | Promise<User>;

    abstract voteUpserted(): Vote | Promise<Vote>;
}

export class Room {
    id: string;
    users?: User[];
    votes?: Vote[];
    phase: Phase;
    stories?: Story[];
}

export class Story {
    id: string;
    roomId: string;
    description: string;
}

export class User {
    id: string;
    name: string;
    roomId: string;
}

export class Vote {
    userId: string;
    roomId: string;
    score: string;
}
