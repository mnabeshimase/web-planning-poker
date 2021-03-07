
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

export class UpsertVoteInput {
    userId: string;
    roomId: string;
    score: string;
}

export abstract class IQuery {
    abstract room(id: string): Room | Promise<Room>;

    abstract listVotesByRoomId(id: string): Vote[] | Promise<Vote[]>;
}

export abstract class ISubscription {
    abstract roomUpdated(): Room | Promise<Room>;

    abstract userCreated(): User | Promise<User>;

    abstract userDeleted(): User | Promise<User>;

    abstract voteUpserted(): Vote | Promise<Vote>;
}

export class Room {
    id: string;
    users?: User[];
    votes?: Vote[];
    phase: Phase;
}

export abstract class IMutation {
    abstract createUser(name: string, roomId?: string): User | Promise<User>;

    abstract deleteUser(id: string): User | Promise<User>;

    abstract upsertVote(upsertVoteInput: UpsertVoteInput): Vote | Promise<Vote>;
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
