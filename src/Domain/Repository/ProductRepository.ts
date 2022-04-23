import { ResponseModel } from "../Dtos/ResponseModel";
import { Product } from "../Model/Product";

export interface ProductRepository {
    findById(id: string): Promise<ResponseModel<Product>>;
    saveItem(item: Product): Promise<ResponseModel<Product>>;
    updateByItem(item: Product): Promise<ResponseModel<Product>>;
    deleteById(id: string): Promise<ResponseModel<Product>>;
}