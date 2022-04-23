import { ResponseModel } from "../../Domain/Dtos/ResponseModel";
import { Product } from "../../Domain/Model/Product";
import { ShoppingCart } from "../../Domain/Model/ShoppingCart";
import { ShoppingCartRepository } from "../../Domain/Repository/ShoppingCartRepository";
import { ShoppingCartService } from "../ShoppingCartService";

export class ShoppingCartServiceImpl implements ShoppingCartService {

    constructor(private repository: ShoppingCartRepository) { }
    
    findProductsByIdShoppingCart(id: string): Promise<ResponseModel<Product>> {
        return this.repository.findProductsByIdShoppingCart(id);
    }
    createCart(): Promise<ResponseModel<ShoppingCart>> {
        return this.repository.createCart();
    }
    addProductToCart(item: ShoppingCart): Promise<ResponseModel<ShoppingCart>> {
        return this.repository.addProductToCart(item);
    }
    deleteCartById(id: string): Promise<ResponseModel<String>> {
        return this.repository.deleteCartById(id);
    }
    deleteProductCartById(idCart: string,idProd: string): Promise<ResponseModel<String>> {
        return this.repository.deleteProductCartById(idCart,idProd);
    }    
}