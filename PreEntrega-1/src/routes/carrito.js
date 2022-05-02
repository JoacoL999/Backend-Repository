const express = require('express');
const { shopController } = require('../controller/shopProd');
const router = express.Router();
const { validarAdmin } = require('../middlewares/funcion1')



router.post('/', async (req, res) => {
  
  
    const { precio, nombre, descripcion, codigo, foto, stock } = req.body;
    
    if (!nombre || !precio)
      return res.status(400).json({
        msg: 'Falta Nombre o Precio en el Body',
      });
  
    const nuevoProducto = {
        precio,
        nombre,
        descripcion,
        codigo,
        foto,
        stock
    };
    
    await shopController.save(nuevoProducto);
  
    res.json({
      msg: 'POST PRODUCTOS',
    });
  
  
  }, );

  router.post('/:id/productos', async (req, res) => {
    const { precio, nombre, descripcion, codigo, foto, stock } = req.body;
    const { id } = req.params; //const id = req.params.id
  
    const producto = await shopController.getById(id);
  
    if (!producto)
      return res.status(404).json({
        msg: 'Product not found',
      });
  
  
    if (!nombre || !precio)
      return res.status(400).json({
        msg: 'Falta Nombre o Precio en el Body',
      });
  
    const nuevoProducto = {  
        precio,
        nombre,
        descripcion,
        codigo,
        foto,
        stock
    };
    
    const result = await shopController.Update(id, nuevoProducto)
  
    res.json({
      data: result,
    });
  });
  

router.get('/:id/productos', async (req, res) => {
    const { id } = req.params;
    const productos = await shopController.getById(id);
    res.json({
        Productos: productos.Productos,
    });
});


router.delete('/:id', async (req, res) => {
  const { id } = req.params; //const id = req.params.id

  await shopController.deleteById(id)
  res.json({
    msg: 'Ok',
  });
});

router.delete('/:id/productos/:id_prod', async (req, res) => {
    const { id, id_prod } = req.params; //const id = req.params.id
    await shopController.deleteProdById(id, id_prod)
    res.json({
      msg: 'Ok',
    });
  });

module.exports = router;
