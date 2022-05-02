const express = require('express');
const productsRouter = require('./productos');
const shopRouter = require('./carrito')

const router = express.Router();

router.use('/productos', productsRouter)
router.use('/carrito', shopRouter)

module.exports = router; //export por default