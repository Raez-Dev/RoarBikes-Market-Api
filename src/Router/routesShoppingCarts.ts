// Import
import * as express from 'express'
import { ResponseModel } from '../Domain/Dtos/ResponseModel';
import { Product } from '../Domain/Model/Product';
import { ShoppingCart } from '../Domain/Model/ShoppingCart';
import Services from '../Services/index';

//  Constants
const { Router } = express;
const routerShoppingCart = Router();
const service = Services.shoppingCartService;
const serviceProducts = Services.productService;

//  Routes middleware

//  Me permite listar todos los productos guardados en el carrito
routerShoppingCart.get('/:id/productos', async (req, res) => {
    const { id } = req.params;
    let response = await service.findProductsByIdShoppingCart(id);
    res.json(response);
})

//  Crea un carrito y devuelve su id.
routerShoppingCart.post('/', async (req, res) => {
    let response = await service.createCart();
    res.json(response);
})

//  Para incorporar productos al carrito por su id de producto
routerShoppingCart.post('/:id/productos', async (req, res) => {

    const { id } = req.params;
    const products: Array<string> = req.body;
    let productsList: Array<Product> = [];

    let responseShopping = await service.findProductsByIdShoppingCart(id);

    if (responseShopping.isSuccess === false && responseShopping.error !== undefined) {
        res.json(responseShopping);

    } else {
        for await (const item of products) {

            const response: ResponseModel<Product> = await serviceProducts.findById(item);
            if (response.isSuccess === true) {
                if (response.data !== undefined) {
                    productsList.push(response.data[0]);
                }
            } else {
                res.json(response);
                return;
            }
        }

        const shoppingCart: ShoppingCart = {
            _id: id,
            timestamp: new Date().getTime(),
            productos: productsList
        }

        let response = await service.addProductToCart(shoppingCart);
        res.json(response);
        //res.json();
    }

})

//  Vacía un carrito y lo elimina
routerShoppingCart.delete('/:id', async (req, res) => {
    const { id } = req.params;
    let response = await service.deleteCartById(id);
    res.json(response);
})

//  Eliminar un producto del carrito por su id de carrito y de producto
routerShoppingCart.delete('/:id/productos/:id_prod', async (req, res) => {
    const { id, id_prod } = req.params;
    let response = await service.deleteProductCartById(id, id_prod);
    res.json(response);
})

export default routerShoppingCart;