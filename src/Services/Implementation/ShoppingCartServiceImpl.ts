import { ResponseModel } from "../../Domain/Dtos/ResponseModel";
import { Product } from "../../Domain/Model/Product";
import { ShoppingCart } from "../../Domain/Model/ShoppingCart";
import { ShoppingCartRepository } from "../../Domain/Repository/ShoppingCartRepository";
import { ShoppingCartService } from "../ShoppingCartService";

export class ShoppingCartServiceImpl implements ShoppingCartService {

    constructor(private repository: ShoppingCartRepository) { }
    
    findProductsByIdShoppingCart(id: number): Promise<ResponseModel<Product>> {
        return this.repository.findProductsByIdShoppingCart(id);
    }
    createCart(): Promise<ResponseModel<ShoppingCart>> {
        return this.repository.createCart();
    }
    addProductToCart(item: ShoppingCart): Promise<ResponseModel<ShoppingCart>> {
        return this.repository.addProductToCart(item);
    }
    deleteCartById(id: number): Promise<ResponseModel<String>> {
        return this.repository.deleteCartById(id);
    }
    deleteProductCartById(idCart: number,idProd: number): Promise<ResponseModel<String>> {
        return this.repository.deleteProductCartById(idCart,idProd);
    }    
}