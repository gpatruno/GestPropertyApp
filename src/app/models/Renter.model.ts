import { IUser } from './IUser.model';
import { IAdress } from './IAdress.model';

export class Renter {
    constructor(
        public User: IUser,
        public Adress: IAdress
    ) { }
}