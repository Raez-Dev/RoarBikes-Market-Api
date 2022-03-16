import { ResponseModel } from "../Domain/Dtos/ResponseModel";
import { Product } from "../Domain/Model/Product";

export interface ProductService {
    findById(id: number): Promise<ResponseModel<Product>>;
    saveItem(item: Product): Promise<ResponseModel<Product>>;
    updateByItem(item: Product): Promise<ResponseModel<Product>>;
    deleteById(id: number): Promise<ResponseModel<Product>>;
}