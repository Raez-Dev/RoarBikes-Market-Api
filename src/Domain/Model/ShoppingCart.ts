import { Product } from "./Product";

export class ShoppingCart {
    constructor(
        public _id: string,
        public timestamp: number,
        public productos: Array<Product>
    ) { }
}