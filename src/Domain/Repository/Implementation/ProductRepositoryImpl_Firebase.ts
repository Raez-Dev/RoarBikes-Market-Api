import * as admin from "firebase-admin";
import { ResponseModel } from "../../Dtos/ResponseModel";
import { Product } from "../../Model/Product";
import { ProductRepository } from "../ProductRepository";

export class ProductRepositoryImpl_Firebase implements ProductRepository {


    private db: admin.firestore.Firestore = new admin.firestore.Firestore;
    private query: any;

    constructor() {
        this.initConfig();
    }

    private initConfig = async () => {

       

        this.db = admin.firestore();
        this.query = this.db.collection('Products');

    }

    findById = async (id: string): Promise<ResponseModel<Product>> => {

        let rm = new ResponseModel<Product>();

        try {

            const doc = this.query.doc(`${id}`);
            let item = await doc.get();
            const response = item.data()

            if (Object.keys(response).length > 0) {
                rm.isSuccess = true;
                rm.msg = "Products found";
                rm.data = [{ _id: id, ...response }];
            } else {
                rm.isSuccess = false;
                rm.msg = id === '0' ? "Empty product list" : `We can't found this product: ${id} `;
            }

            return rm;

        } catch (error) {
            rm.isSuccess = false;
            rm.msg = 'Unaccesible collection';
            rm.error = error;
            return rm;
        }
    }

    saveItem = async (item: Product): Promise<ResponseModel<Product>> => {
        let rm = new ResponseModel<Product>();

        try {

            let productDoc = this.query.doc();
            await productDoc.create({
                ...item
            });
            const doc = this.query.doc(`${productDoc._path.segments[1]}`);
            let productData = await doc.get();
            const response = productData.data();

            rm.isSuccess = true;
            rm.msg = "Product saved";
            rm.entity = { _id: productDoc._path.segments[1], ...response };
            return rm;

        } catch (error: unknown) {
            rm.isSuccess = false;
            rm.msg = 'Unaccesible collection';
            rm.error = error;
            return rm;

        }
    }

    updateByItem = async (item: Product): Promise<ResponseModel<Product>> => {

        let rm = new ResponseModel<Product>();

        try {

            let productDoc = this.query.doc(item._id);            
            await productDoc.update({                
                "descripcion":item.descripcion,
                "codigo":item.codigo,
                "precio":item.precio,
                "timestamp":item.timestamp,
                "stock":item.stock,
                "nombre":item.nombre,
                "foto":item.foto
            });

            let productData = await productDoc.get();
            const response = productData.data();

            rm.isSuccess = true;
            rm.msg = "Product saved";
            rm.entity = { _id: item._id, ...response };
            return rm;

        } catch (error: unknown) {
            rm.isSuccess = false;
            rm.msg = 'Unaccesible collection';
            rm.error = error;
            return rm;

        }

    }

    deleteById = async (id: string): Promise<ResponseModel<Product>> => {
        let rm = new ResponseModel<Product>();
        try {
            const doc = this.query.doc(`${id}`);
            await doc.delete();
            rm.isSuccess = true;
            rm.msg = "Success";

            return rm;
        } catch (error) {
            rm.isSuccess = false;
            rm.msg = 'Unaccesible collection';
            rm.error = error;
            return rm;
        }
    }
}
