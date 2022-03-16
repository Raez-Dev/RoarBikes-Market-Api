import { ResponseModel } from "../Domain/Dtos/ResponseModel";
import { Product } from "../Domain/Model/Product";
import { ShoppingCart } from "../Domain/Model/ShoppingCart";


export interface ShoppingCartService{
    findProductsByIdShoppingCart(id: number): Promise<ResponseModel<Product>>;
    createCart(): Promise<ResponseModel<ShoppingCart>>;
    addProductToCart(item:ShoppingCart): Promise<ResponseModel<ShoppingCart>>;    
    deleteCartById(id: number): Promise<ResponseModel<String>>;
    deleteProductCartById(idCart:number,idProd:number): Promise<ResponseModel<String>>;
}