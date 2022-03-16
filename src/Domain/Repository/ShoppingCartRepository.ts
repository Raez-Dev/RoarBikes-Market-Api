import { ResponseModel } from "../Dtos/ResponseModel";
import { Product } from "../Model/Product";
import { ShoppingCart } from "../Model/ShoppingCart";

export interface ShoppingCartRepository {    
    findProductsByIdShoppingCart(id: number): Promise<ResponseModel<Product>>;
    createCart(): Promise<ResponseModel<ShoppingCart>>;
    addProductToCart(item:ShoppingCart): Promise<ResponseModel<ShoppingCart>>;    
    deleteCartById(id: number): Promise<ResponseModel<String>>;
    deleteProductCartById(idCart: number,idProd: number): Promise<ResponseModel<String>>;
}