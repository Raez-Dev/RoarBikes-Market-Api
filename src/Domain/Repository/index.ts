import * as admin from "firebase-admin";
const serviceAccount = require('../DB/Firebase/ecommerce-roarbike-api-firebase-adminsdk-x95nw-bdb0550427.json');

import { ProductRepositoryImpl_Firebase } from './Implementation/ProductRepositoryImpl_Firebase';
import { ProductRepositoryImpl_Local } from './Implementation/ProductRepositoryImpl_Local';
import { ProductRepositoryImpl_Mongoose } from './Implementation/ProductRepositoryImpl_Mongoose';
import { ShoppingCartRepositoryImpl_Firebase } from './Implementation/ShoppingCartRepositoryImpl_Firebase';
import { ShoppingCartRepositoryImpl_Local } from './Implementation/ShoppingCartRepositoryImpl_Local';
import { ShoppingCartRepositoryImpl_Mongoose } from './Implementation/ShoppingCartRepositoryImpl_Mongoose';

class repositories {

    public productRepository :any;
    public shoppingCartRepository:any;
    constructor() {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
        this.productRepository = new ProductRepositoryImpl_Firebase();
        this.shoppingCartRepository = new ShoppingCartRepositoryImpl_Firebase();
    }
    //productRepository: new ProductRepositoryImpl_Local(),
    //productRepository: new ProductRepositoryImpl_Mongoose(),
    //productRepository: new ProductRepositoryImpl_Local(),
    //productRepository: new ProductRepositoryImpl_Mongoose(),
    //shoppingCartRepository: new ShoppingCartRepositoryImpl_Local()
    //shoppingCartRepository: new ShoppingCartRepositoryImpl_Mongoose()
    //shoppingCartRepository: new ShoppingCartRepositoryImpl_Local()
    //shoppingCartRepository: new ShoppingCartRepositoryImpl_Mongoose()
}

export default repositories;
