import { ProductsModel } from '../models/products';
import { ShopModel } from '../models/shop'
import moment from 'moment';

export const checkBodyShop = async (req, res, next) => {
  const { id } = req.body;

  if (!id)
    return res.status(400).json({
      msg: 'missing Body fields',
    });

  next();
};

export const getAllShop = async (req, res) => {
  try {

    const query = {};
  
    const items = await ShopModel.find(query);

    res.json({
      data: items,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      stack: err.stack,
    });
  }
};

export const getShopById = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await ShopModel.findById(id);

    if (!item)
      return res.status(404).json({
        msgs: 'Product not found!',
      });

    res.json({
      data: item,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      stack: err.stack,
    });
  }
};

export const createShop = async (req, res) => {
  try {
    const { id } = req.body;

    const Product = await ProductsModel.findById(id)

    console.log(Product)
    const newProduct = await ShopModel.create({
      Time: moment().format('DD-MM-YYYY HH:mm:ss'),
      Products:[
        Product
      ]
    });

    console.log('Shop Added')
    res.json({
      data: newProduct,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      stack: err.stack,
    });
  }
};

export const addProducts = async (req, res) => {
  try {
    const idShop = req.params.id;
 
    let item = await ShopModel.findById(idShop);

    if (!item)
      return res.status(404).json({
        msgs: 'Shop not found!',
      });


      const { id } = req.body;

      const Product = await ProductsModel.findById(id)

    const ShopUpdated = await ShopModel.findByIdAndUpdate(
        idShop,
      { $push: {Products: Product} }
    );

    res.json({
      msg: 'Product updated',
      data: ShopUpdated,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      stack: err.stack,
    });
  }
};

export const deleteShop = async (req, res) => {
  try {
    const { id } = req.params;

    await ShopModel.findByIdAndDelete(id);

    res.json({
      msg: 'product deleted',
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      stack: err.stack,
    });
  }
};