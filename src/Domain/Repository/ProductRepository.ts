import { ResponseModel } from "../Dtos/ResponseModel";
import { Product } from "../Model/Product";

export interface ProductRepository {
    findById(id: number): Promise<ResponseModel<Product>>;
    saveItem(item: Product): Promise<ResponseModel<Product>>;
    updateByItem(item: Product): Promise<ResponseModel<Product>>;
    deleteById(id: number): Promise<ResponseModel<Product>>;
}