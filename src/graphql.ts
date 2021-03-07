
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class UpsertVoteInput {
    userId: string;
    roomId: string;
    score: number;
}

export abstract class IQuery {
    abstract room(id: string): Room | Promise<Room>;

    abstract listVotesByRoomId(id: string): Vote[] | Promise<Vote[]>;
}

export class Room {
    id: string;
    users?: User[];
}

export abstract class IMutation {
    abstract createUser(name: string, roomId?: string): User | Promise<User>;

    abstract deleteUser(id: string): User | Promise<User>;

    abstract upsertVote(upsertVoteInput: UpsertVoteInput): Vote | Promise<Vote>;
}

export abstract class ISubscription {
    abstract userCreated(): User | Promise<User>;

    abstract userDeleted(): User | Promise<User>;
}

export class User {
    id: string;
    name: string;
    roomId: string;
}

export class Vote {
    userId: string;
    roomId: string;
    score: number;
}
