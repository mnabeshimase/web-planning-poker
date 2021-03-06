
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface IQuery {
    room(id: string): Room | Promise<Room>;
}

export interface IMutation {
    createRoom(): Room | Promise<Room>;
}

export interface Room {
    id: string;
}
