import * as admin from "firebase-admin";
import { ShoppingCartRepository } from '../ShoppingCartRepository';
import { ResponseModel } from '../../Dtos/ResponseModel';
import { ShoppingCart } from '../../Model/ShoppingCart';
import { Product } from '../../Model/Product';

export class ShoppingCartRepositoryImpl_Firebase implements ShoppingCartRepository {

    private db: admin.firestore.Firestore = new admin.firestore.Firestore;
    private query: any;

    constructor() {
        this.initConfig();
    }

    private initConfig = async () => {

        this.db = admin.firestore();
        this.query = this.db.collection('Orders');
    }

    findProductsByIdShoppingCart = async (id: string): Promise<ResponseModel<Product>> => {
        let rm = new ResponseModel<Product>();

        try {
            const doc = this.query.doc(`${id}`);
            let shoppingCartData = await doc.get();
            const response = shoppingCartData.data();
            let shoppingCartModel: Product[] = response.productos;

            if (shoppingCartModel.length > 0) {
                rm.isSuccess = true;
                rm.msg = "Product list found";
                rm.data = shoppingCartModel;
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

            let shoppingCartDoc = this.query.doc();
            await shoppingCartDoc.create({
                timestamp: Date.now(),
                productos: []
            });

            const doc = this.query.doc(`${shoppingCartDoc._path.segments[1]}`);
            let shoppingCartData = await doc.get();
            const response = shoppingCartData.data();

            rm.isSuccess = true;
            rm.msg = "Shopping Cart saved!";
            rm.entity = { _id: shoppingCartDoc._path.segments[1], ...response };
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
            const doc = this.query.doc(`${item._id}`);
            let shoppingCartData = await doc.get();
            const response = shoppingCartData.data();
            let productos: Product[] = response.productos;

            let productsOrigin: Product[] = [...productos];
            let productsNew: Product[] = [...item.productos];
            let productsConcat: Product[] = [...productsOrigin.concat(productsNew)];
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
                rm.msg = "Some products are in the shopping cart, please remove them and try again.";
            } else {

                let productDoc = this.query.doc(item._id);
                await productDoc.update({
                    "productos": productsDistinct,
                    "timestamp": item.timestamp
                });

                rm.isSuccess = true;
                rm.msg = "Shoppingcart updated";
                rm.entity = productDoc;
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
            const doc = this.query.doc(`${id}`);
            await doc.delete();
            rm.isSuccess = true;
            rm.msg = "Success";
            return rm;
        } catch (error) {
            rm.isSuccess = false;
            rm.msg = "We can't drop this element";
            rm.error = error;
            return rm;
        }
    }

    deleteProductCartById = async (idCart: string, idProd: string): Promise<ResponseModel<String>> => {

        let rm = new ResponseModel<String>();

        try {
            const doc = this.query.doc(`${idCart}`);
            let shoppingCartData = await doc.get();
            const response = shoppingCartData.data();

            if (response.productos.length > 0) {

                const productsNew: Product[] = [...response.productos.filter(item => item._id.toString() != idProd)];

                if (response.productos.length == productsNew.length) {
                    rm.isSuccess = false;
                    rm.msg = "Product didn't exist";
                } else {
                    let productDoc = this.query.doc(idCart);
                    await productDoc.update({
                        "productos": productsNew
                    });
                    rm.isSuccess = true;
                    rm.msg = "Shoppingcart deleted";
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