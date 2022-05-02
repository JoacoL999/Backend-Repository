const { time } = require('console');
const fs = require('fs');
const moment = require('moment');

//Esto solo va a funcionar si el archivo ya existe
class Productos {
  constructor(nombreArchivo) {
      
    this.archivo = nombreArchivo;
  }

  async getData() {
    const data = await fs.promises.readFile(this.archivo, 'utf-8'); //data = '[]'
    return JSON.parse(data);
  }

  async saveData(data) {
    await fs.promises.writeFile(this.archivo, JSON.stringify(data, null, '\t'));
  }

  async save(miObjeto) {
    const productos = await this.getData();
    let idUser = (productos.length+1).toString();

    const productoNuevo = {
      id: (1).toString(),
      nombre: miObjeto.nombre,
      precio: miObjeto.precio,
      fecha: moment().format('DD-MM-YYYY HH:mm:ss'),
      descripcion: miObjeto.descrp,
      codigo: miObjeto.code,
      foto: miObjeto.pic,
      stock: miObjeto.stock
    };
    productos.push({id: idUser, Fecha: moment().format('DD-MM-YYYY HH:mm:ss'), Productos: [productoNuevo]});

    await this.saveData(productos);

    return productoNuevo;
  }

  async saveShop(miObjeto) {
    const productos = await this.getData();
    let id;

    const productoNuevo = {
      id: (productos.length+1).toString(),
      nombre: miObjeto.nombre,
      precio: miObjeto.precio,
      fecha: moment().format('DD-MM-YYYY HH:mm:ss'),
      descripcion: miObjeto.descripcion,
      codigo: miObjeto.codigo,
      foto: miObjeto.foto,
      stock: miObjeto.stock
    };

    productos.push(productoNuevo);

    await this.saveData(productos);

    return productoNuevo;
  }

  async getById(number) {
    const productos = await this.getData();

    const indice = productos.findIndex((unProducto) => {
      if (unProducto.id === number) return true;
      else return false;
    });

    if (indice === -1) return null;

    return productos[indice];
  }

  async getAll() {
    const productos = await this.getData();

    return productos;
  }

  async deleteById(number) {
    const productos = await this.getData();

    const nuevoArray = productos.filter(
      (unProducto) => unProducto.id != number
    );

    await this.saveData(nuevoArray);
  }

  async deleteProdById(id, idProd) {
    const productos = await this.getData();


    const prodID = productos.find((unProducto) => unProducto.id === id);
    const indice = productos.findIndex((unProducto) => unProducto.id === id);
    if (indice < 0) throw new Error('no existe el carrito');

    const ProductosID = []
   
    const deleteProd = prodID.Productos.filter((prod) => prod.id !== idProd)

    deleteProd.map((prod) => {
        const prodsOld = {
            id: (ProductosID.length+1).toString(),
            nombre: prod.nombre,
            precio: prod.precio,
            fecha: prod.fecha,
            descripcion: prod.descripcion,
            codigo: prod.codigo,
            foto: prod.foto,
            stock: prod.stock
        }
    
        ProductosID.push(prodsOld)
        

    })

    const newProd = {
        id: id,
        Fecha: prodID.Fecha,
        Productos: ProductosID
    }
    
    productos.splice(indice, 1, newProd);

    await this.saveData(productos);

    return newProd;
  }


  async deleteAll() {
    const nuevo = [];

    await this.saveData(nuevo);
  }

  async Update(id, nuevaData) {
    const productos = await this.getAll();

    const prodID = productos.find((unProducto) => unProducto.id === id);
    const indice = productos.findIndex((unProducto) => unProducto.id === id);
    if (indice < 0) throw new Error('no existe el carrito');

    const ProductosID = []
   
    prodID.Productos.map((prod) => {
        const prodsOld = {
            id: prod.id,
            nombre: prod.nombre,
            precio: prod.precio,
            fecha: prod.time,
            descripcion: prod.descripcion,
            codigo: prod.codigo,
            foto: prod.foto,
            stock: prod.stock
        }
    
        ProductosID.push(prodsOld)
        

    })
    console.log(ProductosID)  

    const productoNuevo = {
        id: (ProductosID.length+1).toString(),
        nombre: nuevaData.nombre,
        precio: nuevaData.precio,
        fecha: moment().format('DD-MM-YYYY HH:mm:ss'),
        descripcion: nuevaData.descripcion,
        codigo: nuevaData.codigo,
        foto: nuevaData.foto,
        stock: nuevaData.stock
      };
    ProductosID.push(productoNuevo)

    const newProd = {
        id: id,
        fecha: moment().format('DD-MM-YYYY HH:mm:ss'),
        Productos: ProductosID,
    }
    
    console.log(newProd)
    productos.splice(indice, 1, newProd);

    await this.saveData(productos);

    return newProd;
  }
}

const shopController = new Productos('src/shop.json');

module.exports = {
  shopController: shopController,
};
