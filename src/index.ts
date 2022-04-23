import express from "express";
import config from "./Config/config"; 
import { routesProducts, routesShoppingCarts } from "./Router/routes";

//  Constants
const app = express();
const PORT: number = config.PORT;

//  Config Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//  Routes Middleware
app.use('/api/productos', routesProducts);
app.use('/api/carrito', routesShoppingCarts);

//  PORT Config
app.listen(PORT, () => {
    console.log(`App is running in http://localhost:${PORT}`);
})