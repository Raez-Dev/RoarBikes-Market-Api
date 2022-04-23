import { Schema, model } from 'mongoose';
import { ShoppingCart } from '../../Model/ShoppingCart';
import { productSchema } from './ProductModel';

const schema = new Schema({
    timestamp: { type: Number, required: true },
    productos: { type: [productSchema], required: true }
})

const ShoppingCartModel = model<ShoppingCart>('ShoppingCart', schema);

export default ShoppingCartModel;