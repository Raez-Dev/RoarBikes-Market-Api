import { ResponseModel } from "../Dtos/ResponseModel";
import { Product } from "../Model/Product";
import { ShoppingCart } from "../Model/ShoppingCart";

export interface ShoppingCartRepository {    
    findProductsByIdShoppingCart(id: string): Promise<ResponseModel<Product>>;
    createCart(): Promise<ResponseModel<ShoppingCart>>;
    addProductToCart(item:ShoppingCart): Promise<ResponseModel<ShoppingCart>>;    
    deleteCartById(id: string): Promise<ResponseModel<String>>;
    deleteProductCartById(idCart: string,idProd: string): Promise<ResponseModel<String>>;
}