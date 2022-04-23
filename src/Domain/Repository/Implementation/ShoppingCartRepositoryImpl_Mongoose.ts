import { connect } from 'mongoose';
import config from '../../../Config/config';
import { ShoppingCartRepository } from '../ShoppingCartRepository';
import { ResponseModel } from '../../Dtos/ResponseModel';
import { ShoppingCart } from '../../Model/ShoppingCart';
import { Product } from '../../Model/Product';
import ShoppingCartModel from '../../DB/Mongoose/ShoppingCartModel';

export class ShoppingCartRepositoryImpl_Mongoose implements ShoppingCartRepository {

    constructor() {
        this.initConfig();
    }

    private initConfig = async () => {
        await connect(config.MONGO_URI);
    }

    findProductsByIdShoppingCart = async (id: string): Promise<ResponseModel<Product>> => {
        let rm = new ResponseModel<Product>();

        try {
            const shoppingCartModel = await ShoppingCartModel.find(id === '0' ? {} : { _id: id });
            if (shoppingCartModel.length > 0) {
                if (shoppingCartModel[0].productos.length > 0) {
                    rm.isSuccess = true;
                    rm.msg = "Product list found";
                    rm.data = shoppingCartModel[0].productos;
                } else {
                    rm.isSuccess = false;
                    rm.msg = "Product list empty";
                }
            } else {
                rm.isSuccess = false;
                rm.msg = "Empty collection";
            }
            return rm;
        } catch (error) {
            rm.isSuccess = false;
            rm.msg = 'Unaccesible collection';
            rm.error = error;
            return rm;
        }
    }

    createCart = async (): Promise<ResponseModel<ShoppingCart>> => {
        let rm = new ResponseModel<ShoppingCart>();

        try {
            const shoppingCartModel = new ShoppingCartModel({
                timestamp: Date.now(),
                productos: []
            });

            await shoppingCartModel.save();

            rm.isSuccess = true;
            rm.msg = "Shopping Cart saved!";
            rm.entity = shoppingCartModel;
            return rm;
        } catch (error: unknown) {
            rm.isSuccess = false;
            rm.msg = 'Unaccesible collection';
            rm.error = error;
            return rm;
        }
    }

    addProductToCart = async (item: ShoppingCart): Promise<ResponseModel<ShoppingCart>> => {

        let rm = new ResponseModel<ShoppingCart>();

        try {
            const shoppingCartModel = await ShoppingCartModel.find({ _id: item._id });

            if (shoppingCartModel.length > 0) {

                let productsOrigin: Product[] = shoppingCartModel[0].productos;
                let productsNew: Product[] = item.productos;
                let productsConcat: Product[] = productsOrigin.concat(productsNew);
                let productsDistinct: Product[] = Array<Product>();

                productsConcat.map((item) => {
                    let productSearch: Product[] = productsDistinct.filter(
                        (product: Product) => product._id.toString() == item._id.toString()
                    )
                    if (productSearch.length == 0) {
                        productsDistinct.push(item);
                    }
                });

                if (productsOrigin.length == productsDistinct.length) {
                    rm.isSuccess = false;
                    rm.msg = "Product found in shopping cart";
                } else {
                    const shoppingCartModelUpdate = await ShoppingCartModel.updateOne({ _id: item._id }, { $set: { productos: productsDistinct } });

                    if (shoppingCartModelUpdate.modifiedCount > 0) {
                        rm.isSuccess = true;
                        rm.msg = "Shoppingcart updated";
                    } else {
                        rm.isSuccess = false;
                        rm.msg = "Shoppingcart didn't update";
                    }
                }

            } else {
                rm.isSuccess = false;
                rm.msg = "Empty collection";
            }
            return rm;
        } catch (error) {
            rm.isSuccess = false;
            rm.msg = 'Unaccesible collection';
            rm.error = error;
            return rm;
        }

    }
    deleteCartById = async (id: string): Promise<ResponseModel<String>> => {
        let rm = new ResponseModel<String>();
        try {
            let shoppingCartModel = await ShoppingCartModel.deleteOne({ _id: id })
            if (shoppingCartModel.acknowledged === true && shoppingCartModel.deletedCount > 0) {
                rm.isSuccess = true;
                rm.msg = "Success";
            } else {
                rm.isSuccess = false;
                rm.msg = "We can't drop this element";
            }
            return rm;
        } catch (error) {
            rm.isSuccess = false;
            rm.msg = 'Unaccesible collection';
            rm.error = error;
            return rm;
        }
    }
    deleteProductCartById = async (idCart: string, idProd: string): Promise<ResponseModel<String>> => {
        
        let rm = new ResponseModel<String>();

        try {
            const shoppingCartModel = await ShoppingCartModel.find({ _id: idCart });

            if (shoppingCartModel.length > 0) {

                const productsNew: Product[] = [...shoppingCartModel[0].productos.filter(item => item._id.toString() != idProd) ];                

                if (shoppingCartModel[0].productos.length == productsNew.length) {
                    rm.isSuccess = false;
                    rm.msg = "Product didn't exist";
                } else {
                    const shoppingCartModelUpdate = await ShoppingCartModel.updateOne({ _id: idCart}, { $set: { productos: productsNew } });

                    if (shoppingCartModelUpdate.modifiedCount > 0) {
                        rm.isSuccess = true;
                        rm.msg = "Shoppingcart deleted";
                    } else {
                        rm.isSuccess = false;
                        rm.msg = "Shoppingcart didn't deleted";
                    }
                }

            } else {
                rm.isSuccess = false;
                rm.msg = "Empty collection";
            }
            return rm;
        } catch (error) {
            rm.isSuccess = false;
            rm.msg = 'Unaccesible collection';
            rm.error = error;
            return rm;
        }



    }


}