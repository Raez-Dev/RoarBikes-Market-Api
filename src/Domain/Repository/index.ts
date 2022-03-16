import { ProductRepositoryImpl_Local } from './Implementation/ProductRepositoryImpl_Local';
import {ShoppingCartRepositoryImpl_Local } from './Implementation/ShoppingCartRepositoryImpl_Local';

const repositories = {
    productRepository: new ProductRepositoryImpl_Local(),
    shoppingCartRepository: new ShoppingCartRepositoryImpl_Local()
}

export default repositories;
