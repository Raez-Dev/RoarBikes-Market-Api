import { ResponseModel } from "../../Domain/Dtos/ResponseModel";
import { Product } from "../../Domain/Model/Product";
import { ProductRepository } from "../../Domain/Repository/ProductRepository";
import { ProductService } from "../ProductService";

export class ProductServiceImpl implements ProductService {

    constructor(private repository: ProductRepository) { }

    async findById(id: number): Promise<ResponseModel<Product>> {        
        return await this.repository.findById(id);
    }
    async saveItem(item: Product): Promise<ResponseModel<Product>> {
        return await this.repository.saveItem(item);
    }
    async updateByItem(item: Product): Promise<ResponseModel<Product>> {
        return await this.repository.updateByItem(item);
    }
    async deleteById(id: number): Promise<ResponseModel<Product>> {
        return await this.repository.deleteById(id);
    }

}