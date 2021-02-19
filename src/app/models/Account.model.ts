import { IUser } from './IUser.model';

export class Account {
    constructor(
        public _id: string,
        public User: IUser,
        public password: string,
    ) { }
}