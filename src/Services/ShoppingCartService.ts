import { ResponseModel } from "../Domain/Dtos/ResponseModel";
import { Product } from "../Domain/Model/Product";
import { ShoppingCart } from "../Domain/Model/ShoppingCart";


export interface ShoppingCartService{
    findProductsByIdShoppingCart(id: string): Promise<ResponseModel<Product>>;
    createCart(): Promise<ResponseModel<ShoppingCart>>;
    addProductToCart(item:ShoppingCart): Promise<ResponseModel<ShoppingCart>>;    
    deleteCartById(id: string): Promise<ResponseModel<String>>;
    deleteProductCartById(idCart:string,idProd:string): Promise<ResponseModel<String>>;
}