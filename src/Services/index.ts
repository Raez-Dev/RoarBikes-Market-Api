import { ProductServiceImpl } from './Implementation/ProductServiceImpl';
import { ShoppingCartServiceImpl } from './Implementation/ShoppingCartServiceImpl';
import repositories from '../Domain/Repository';

const Services = {
    productService: new ProductServiceImpl(repositories.productRepository),
    shoppingCartService: new ShoppingCartServiceImpl(repositories.shoppingCartRepository)
};

export default Services;
