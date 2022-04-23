import * as fs from 'fs';
import { ShoppingCartRepository } from '../ShoppingCartRepository';
import '../../DB/ShoppingCarts.txt';
import { ResponseModel } from '../../Dtos/ResponseModel';
import { ShoppingCart } from '../../Model/ShoppingCart';
import { Product } from '../../Model/Product';

const PATH: string = './dist/resources/ShoppingCarts.txt';

export class ShoppingCartRepositoryImpl_Local implements ShoppingCartRepository {

    async findProductsByIdShoppingCart(id: string): Promise<ResponseModel<Product>> {
        let rm = new ResponseModel<Product>();

        try {
            let fileContent: string = await fs.promises.readFile(`${PATH}`, 'utf-8');

            if (fileContent === "" || fileContent === "[]") {
                rm.isSuccess = false;
                rm.msg = "Empty cart list";
            } else {
                let shoppingCartList: Array<ShoppingCart> = JSON.parse(fileContent);
                let shoppingCartListObj: Array<ShoppingCart> = shoppingCartList.filter((sCart: ShoppingCart) => sCart._id === id);
                if (shoppingCartListObj.length === 0) {
                    rm.isSuccess = false;
                    rm.msg = "Cart not found!";
                } else {
                    let shoppingCart: ShoppingCart = shoppingCartListObj[0];
                    rm.isSuccess = true;
                    rm.msg = "Success response!";
                    rm.data = shoppingCart.productos;
                }
            }

        } catch (error: unknown) {
            rm.isSuccess = false;
            rm.msg = 'Unaccesible file';
            rm.error = error;
            return rm;
        }

        return rm;
    }
    async createCart(): Promise<ResponseModel<ShoppingCart>> {
        let rm = new ResponseModel<ShoppingCart>();

        try {
            let fileContent = await fs.promises.readFile(`${PATH}`, 'utf-8');

            if (fileContent === "" || fileContent === "[]") {

                let shoppingCart: ShoppingCart;
                shoppingCart = {
                    _id: '1',
                    timestamp: Date.now(),
                    productos: []
                };

                let shoppingCarts: Array<ShoppingCart> = [shoppingCart];
                try {

                    await fs.promises.writeFile(`${PATH}`, JSON.stringify(shoppingCarts));
                    rm.isSuccess = true;
                    rm.msg = "Shopping Cart saved!";
                    rm.entity = shoppingCart;
                } catch (error1: unknown) {
                    rm.isSuccess = false;
                    rm.msg = 'Unaccesible file';
                    rm.error = error1;
                    return rm;
                }
            }
            else {

                let shoppingCartList = JSON.parse(fileContent);
                let ids: Array<number> = shoppingCartList.map((item: ShoppingCart) => item._id)
                let newId: number = Math.max(...ids) + 1;
                let shoppingCart: ShoppingCart;
                shoppingCart = {
                    _id: newId.toString(),
                    timestamp: Date.now(),
                    productos: []
                };

                let newShoppingCartList: Array<ShoppingCart> = [...shoppingCartList, shoppingCart];

                try {
                    await fs.promises.writeFile(`${PATH}`, JSON.stringify(newShoppingCartList));
                    rm.isSuccess = true;
                    rm.msg = "Shopping Cart saved!";
                    rm.entity = shoppingCart;
                } catch (error2: unknown) {
                    rm.isSuccess = false;
                    rm.msg = 'Unaccesible file';
                    rm.error = error2;
                    return rm;
                }
            }

            return rm;

        } catch (error: unknown) {
            rm.isSuccess = false;
            rm.msg = 'Unaccesible file';
            rm.error = error;
            return rm;
        }

    }
    async addProductToCart(item: ShoppingCart): Promise<ResponseModel<ShoppingCart>> {
        let rm = new ResponseModel<ShoppingCart>();

        try {
            let fileContent: string = await fs.promises.readFile(`${PATH}`, 'utf-8');

            if (fileContent === "" || fileContent === "[]") {
                rm.isSuccess = false;
                rm.msg = "Empty list";
            } else {
                try {

                    let shoppingCartList: Array<ShoppingCart> = JSON.parse(fileContent);
                    let shoppingCartListNew: Array<ShoppingCart> = shoppingCartList.filter((sCart: ShoppingCart) => sCart._id !== item._id);
                    let shoppingCartListObj: Array<ShoppingCart> = shoppingCartList.filter((sCart: ShoppingCart) => sCart._id === item._id);

                    if (shoppingCartListObj.length === 0) {
                        rm.isSuccess = true;
                        rm.msg = "Cart not found!";
                    } else {
                        let shoppingCart: ShoppingCart = shoppingCartListObj[0];
                        let newProducts: Array<Product> = shoppingCart?.productos.concat(item.productos).filter(
                            (p: Product, i: number, arr: Array<Product>) => arr.findIndex((t: Product) => t._id === p._id) === i
                        );

                        shoppingCart = { ...shoppingCart, "productos": newProducts };
                        await fs.promises.writeFile(`${PATH}`, JSON.stringify([...shoppingCartListNew, shoppingCart]));
                        rm.isSuccess = true;
                        rm.msg = "Product saved!";
                    }

                } catch (error1: unknown) {
                    rm.isSuccess = false;
                    rm.msg = 'Unaccesible file';
                    rm.error = error1;
                    return rm;
                }
            }

            return rm;

        } catch (error: unknown) {
            rm.isSuccess = false;
            rm.msg = 'Unaccesible file';
            rm.error = error;
            return rm;
        }
    }
    async deleteCartById(id: string): Promise<ResponseModel<String>> {
        let rm = new ResponseModel<String>();

        try {
            let fileContent: string = await fs.promises.readFile(`${PATH}`, 'utf-8');

            if (fileContent === "" || fileContent === "[]") {
                rm.isSuccess = false;
                rm.msg = "Empty list";
            } else {
                try {

                    let shoppingCartList: Array<ShoppingCart> = JSON.parse(fileContent);
                    let shoppingCartListNew: Array<ShoppingCart> = shoppingCartList.filter((sCart: ShoppingCart) => sCart._id !== id);
                    let shoppingCartListObj: Array<ShoppingCart> = shoppingCartList.filter((sCart: ShoppingCart) => sCart._id === id);

                    if (shoppingCartListObj.length === 0) {
                        rm.isSuccess = true;
                        rm.msg = "Cart doesn't exist!";
                    } else {
                        await fs.promises.writeFile(`${PATH}`, JSON.stringify(shoppingCartListNew));
                        rm.isSuccess = true;
                        rm.msg = "Shopping cart deleted!";
                    }

                } catch (error1: unknown) {
                    rm.isSuccess = false;
                    rm.msg = 'Unaccesible file';
                    rm.error = error1;
                    return rm;
                }
            }
            return rm;

        } catch (error: unknown) {
            rm.isSuccess = false;
            rm.msg = 'Unaccesible file';
            rm.error = error;
            return rm;
        }
    }
    async deleteProductCartById(idCart: string, idProd: string): Promise<ResponseModel<String>> {
        let rm = new ResponseModel<String>();

        try {
            let fileContent: string = await fs.promises.readFile(`${PATH}`, 'utf-8');

            if (fileContent === "" || fileContent === "[]") {
                rm.isSuccess = false;
                rm.msg = "Empty list";
            } else {
                try {

                    let shoppingCartList: Array<ShoppingCart> = JSON.parse(fileContent);
                    let shoppingCartListNew: Array<ShoppingCart> = shoppingCartList.filter((sCart: ShoppingCart) => sCart._id !== idCart);
                    let shoppingCartListObj: Array<ShoppingCart> = shoppingCartList.filter((sCart: ShoppingCart) => sCart._id === idCart);

                    if (shoppingCartListObj.length === 0) {
                        rm.isSuccess = true;
                        rm.msg = "Cart not found!";
                    } else {
                        let shoppingCart: ShoppingCart = shoppingCartListObj[0];
                        let productsList: Array<Product> = shoppingCart?.productos;

                        if (productsList.filter((p: Product) => p._id === idProd).length === 0) {
                            rm.isSuccess = false;
                            rm.msg = "Product not found in Shopping Cart!";
                        } else {
                            let newProducts = productsList.filter((p: Product) => p._id !== idProd);
                            shoppingCart = { ...shoppingCart, "productos": newProducts };
                            await fs.promises.writeFile(`${PATH}`, JSON.stringify([...shoppingCartListNew, shoppingCart]));
                            rm.isSuccess = true;
                            rm.msg = "Product removed from basket!";
                        }
                    }

                } catch (error1: unknown) {
                    rm.isSuccess = false;
                    rm.msg = 'Unaccesible file';
                    rm.error = error1;
                    return rm;
                }
            }

            return rm;

        } catch (error: unknown) {
            rm.isSuccess = false;
            rm.msg = 'Unaccesible file';
            rm.error = error;
            return rm;
        }
    }
}