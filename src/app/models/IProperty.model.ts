import { IAdress } from './IAdress.model';

export class IProperty {
    constructor(
        public Name: string,
        public Type: string,
        public Loyer: number,
        public Adress: IAdress,
        public Desc: string
    ) { }
}