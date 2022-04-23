import { Schema, model } from 'mongoose';
import { Product } from '../../Model/Product';

export const productSchema = new Schema<Product>({    
    timestamp: { type: Number, required: true },
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    codigo: { type: String, required: true },
    foto: { type: String, required: true },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true }
})

const ProductModel = model<Product>('Product', productSchema);

export default ProductModel;