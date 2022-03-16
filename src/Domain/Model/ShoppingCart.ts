import { Product } from "./Product";

export class ShoppingCart {
    constructor(
        public id: number,
        public timestamp: number,
        public productos: Array<Product>
    ) { }
}