
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export abstract class IQuery {
    abstract room(id: string): Room | Promise<Room>;
}

export abstract class IMutation {
    abstract createRoom(): Room | Promise<Room>;

    abstract createUser(name: string, roomId: string): User | Promise<User>;
}

export class Room {
    id: string;
    users?: User[];
}

export abstract class ISubscription {
    abstract userCreated(): User | Promise<User>;
}

export class User {
    name: string;
    roomId: string;
}
