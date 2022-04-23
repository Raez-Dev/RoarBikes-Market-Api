import { connect } from 'mongoose';
import config from '../../../Config/config';
import ProductModel from '../../DB/Mongoose/ProductModel';
import { ResponseModel } from "../../Dtos/ResponseModel";
import { Product } from "../../Model/Product";
import { ProductRepository } from "../ProductRepository";

export class ProductRepositoryImpl_Mongoose implements ProductRepository {

    constructor() {
        this.initConfig();
    }

    private initConfig = async () => {
        await connect(config.MONGO_URI);
    }

    findById = async (id: string): Promise<ResponseModel<Product>> => {

        let rm = new ResponseModel<Product>();

        try {

            const products = await ProductModel.find(id === '0' ? {} : { _id: id });
            if (products.length > 0) {
                rm.isSuccess = true;
                rm.msg = "Products list found";
                rm.data = products;
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

            const productDoc = new ProductModel({
                ...item
            });
            await productDoc.save();

            rm.isSuccess = true;
            rm.msg = "Product saved";
            rm.entity = productDoc;

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
            let id: string = item._id;

            await ProductModel.findOneAndUpdate({ _id: id }, {
                nombre: item.nombre,
                descripcion: item.descripcion,
                codigo: item.codigo,
                foto: item.foto,
                precio: item.precio,
                stock: item.stock,
                timestamp: item.timestamp
            }, {
                new: true
            })

            rm.isSuccess = true;
            rm.msg = "Success";
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
            let productDelete = await ProductModel.deleteOne({ _id: id })
            if (productDelete.acknowledged === true && productDelete.deletedCount > 0) {
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
}
