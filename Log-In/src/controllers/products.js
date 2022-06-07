import { ProductsModel } from '../models/products';

export const checkBodyProduct = async (req, res, next) => {
  const { name, stock, price } = req.body;

  if (!name || !stock || !price)
    return res.status(400).json({
      msg: 'missing Body fields',
    });

  next();
};

export const getAllProducts = async (req, res) => {
  try {
    const { priceMin } = req.query;

    const query = {};

    if(priceMin) 
      query.price = {
        $gt: Number(priceMin)
      }

    
    const items = await ProductsModel.find(query);

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

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await ProductsModel.findById(id);

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

export const createProduct = async (req, res) => {
  try {
    const { name, stock, price } = req.body;

    const newProduct = await ProductsModel.create({
      name,
      stock,
      price,
    });

    console.log('prod added')
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

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, stock, price } = req.body;

    let item = await ProductsModel.findById(id);

    if (!item)
      return res.status(404).json({
        msgs: 'Product not found!',
      });

    const productUpdated = await ProductsModel.findByIdAndUpdate(
      id,
      { name, stock, price },
      { new: true }
    );

    res.json({
      msg: 'Product updated',
      data: productUpdated,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      stack: err.stack,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await ProductsModel.findByIdAndDelete(id);

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