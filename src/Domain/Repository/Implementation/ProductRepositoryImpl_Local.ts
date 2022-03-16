import * as fs from 'fs';
import { ResponseModel } from '../../Dtos/ResponseModel';
import { Product } from '../../Model/Product';
import { ProductRepository } from '../ProductRepository';
import '../../DB/Products.txt';

const PATH: string = './dist/resources/Products.txt';

export class ProductRepositoryImpl_Local implements ProductRepository {

    findById = async (id: number): Promise<ResponseModel<Product>> => {

        let rm = new ResponseModel<Product>();

        try {
            let fileContent = await fs.promises.readFile(`${PATH}`, 'utf-8');

            if (fileContent === "" || fileContent === "[]") {
                rm.isSuccess = false;
                rm.msg = "Empty product list";
            } else {
                let products = JSON.parse(fileContent);
                if (id === 0) {

                    rm.isSuccess = true;
                    rm.msg = "Success";
                    rm.data = products;

                } else {                    
                    const product: Product = products.find((item: Product) => item.id === id)
                    
                    if (Object.keys(product).length === 0 ) {
                        rm.isSuccess = false;
                        rm.msg = "Product not found";
                    } else {
                        rm.isSuccess = true;
                        rm.msg = "Product found";
                        rm.entity = product;
                    }
                }
            }
            return rm;
        } catch (error) {
            rm.isSuccess = false;
            rm.msg = 'Unaccesible file';
            rm.error = error;
            return rm
        }
    }

    saveItem = async (item: Product): Promise<ResponseModel<Product>> => {
        let rm = new ResponseModel<Product>();

        try {

            let fileContent = await fs.promises.readFile(`${PATH}`, 'utf-8');

            if (fileContent === "" || fileContent === "[]") {

                let products: Array<Product> = [{ ...item, "id": 1 }];
                try {
                    await fs.promises.writeFile(`${PATH}`, JSON.stringify(products));
                    rm.isSuccess = true;
                    rm.msg = "Product saved!";
                    rm.entity = { ...item, "id": 1 };
                } catch (error1) {
                    rm.isSuccess = false;
                    rm.msg = 'Unaccesible file';
                    rm.error = error1;
                }
            }
            else {

                let products = JSON.parse(fileContent);
                let ids: Array<number> = products.map((item: Product) => item.id)
                let newId: number = item.id !== 0 ? item.id : Math.max(...ids) + 1;
                let newProducts: Array<Product> = [...products, { ...item, "id": newId }];

                try {
                    await fs.promises.writeFile(`${PATH}`, JSON.stringify(newProducts));
                    rm.isSuccess = true;
                    rm.msg = "Product saved!";
                    rm.entity = { ...item, "id": newId };
                } catch (error2) {
                    rm.isSuccess = false;
                    rm.msg = 'Unaccesible file';
                    rm.error = error2;
                }

            }
            return rm;

        } catch (error) {

            rm.isSuccess = false;
            rm.msg = 'Unaccesible file';
            rm.error = error;
            return rm;

        }
    }

    updateByItem = async (item: Product): Promise<ResponseModel<Product>> => {

        const response: ResponseModel<Product> = await this.deleteById(item.id);

        if (response.isSuccess === true) {
            const responseUpdate: ResponseModel<Product> = await this.saveItem(item);
            return responseUpdate;
        }
        else {
            return response;
        }
    }

    deleteById = async (id: number): Promise<ResponseModel<Product>> => {
        let rm = new ResponseModel<Product>();
        try {
            let fileContent = await fs.promises.readFile(`${PATH}`, 'utf-8');

            if (fileContent === "" || fileContent === "[]") {
                rm.isSuccess = false;
                rm.msg = "Empty product list";
            } else {

                let products = JSON.parse(fileContent);
                let newProducts = products.filter((item: Product) => item.id !== id)
                await fs.promises.writeFile(`${PATH}`, JSON.stringify(newProducts));

                rm.isSuccess = true;
                rm.msg = "Success";
            }
            return rm;
        } catch (error) {
            rm.isSuccess = false;
            rm.msg = 'Unaccesible file';
            rm.error = error;
            return rm
        }
    }

}