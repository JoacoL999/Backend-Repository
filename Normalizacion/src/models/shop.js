import mongoose from 'mongoose';

export const shopCollectionName = 'carrito';

const productsSchema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      stock: { type: Number, required: true },
    }
  )


const shopSchema = new mongoose.Schema(
  {
    Time: { type: String, required: true },
    Products: [productsSchema] 
  }
);

export const ShopModel = mongoose.model(
  shopCollectionName,
  shopSchema
);

