export class Product {
    constructor(
        public id: number,
        public timestamp: number,
        public nombre: String,
        public descripcion: String,
        public codigo: String,
        public foto: String,
        public precio: number,
        public stock: number){}
}