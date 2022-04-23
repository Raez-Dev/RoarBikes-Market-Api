import { ProductServiceImpl } from './Implementation/ProductServiceImpl';
import { ShoppingCartServiceImpl } from './Implementation/ShoppingCartServiceImpl';
import repositories from '../Domain/Repository';

const _repositories = new repositories();
const Services = {
    productService: new ProductServiceImpl(_repositories.productRepository),
    shoppingCartService: new ShoppingCartServiceImpl(_repositories.shoppingCartRepository)
};

export default Services;
