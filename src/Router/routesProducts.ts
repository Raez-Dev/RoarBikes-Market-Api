// Import
import * as express from 'express'
import { ResponseModel } from '../Domain/Dtos/ResponseModel';
import { Product } from '../Domain/Model/Product';
import Services from '../Services/index';

//  Constants
const { Router } = express;
const routerProductos = Router();
const service = Services.productService;

//  Routes middleware
routerProductos.get('/:id?', async (req, res) => {
    const { id } = req.params;
    let response = await service.findById(id === undefined ? 0 : parseInt(id));
    res.json(response);
})

routerProductos.post('/:administrador', async (req, res) => {

    const { administrador } = req.params;

    if (administrador === 'true') {
        const body: Product = { ...req.body, "timestamp": Date.now() };
        let response = await service.saveItem(body);
        res.json(response);
    } else {
        let response = new ResponseModel<string>();
        response.isSuccess = false;
        response.msg = `Path '/' method:Post not allowed`;
        res.json(response);
    }
})

routerProductos.put('/:administrador', async (req, res) => {
    const { administrador } = req.params;

    if (administrador === 'true') {
        const body: Product = req.body;
        let response = await service.updateByItem(body);
        res.json(response);
    } else {
        let response = new ResponseModel<string>();
        response.isSuccess = false;
        response.msg = `Path '/' method:Put not allowed`;
        res.json(response);
    }
})

routerProductos.delete('/:id?/:administrador', async (req, res) => {
    const { administrador } = req.params;

    if (administrador === 'true') {
        const id: number = req.params.id === undefined ? 0 : parseInt(req.params.id);
        let response = await service.deleteById(id);
        res.json(response);
    } else {
        let response = new ResponseModel<string>();
        response.isSuccess = false;
        response.msg = `Path '/:id?' method:Delete not allowed`;
        res.json(response);
    }
})

export default routerProductos;