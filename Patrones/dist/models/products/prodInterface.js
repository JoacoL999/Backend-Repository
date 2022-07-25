"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsDTO = void 0;
class ProductsDTO {
    constructor(data) {
        this.nombre = data.nombre;
        this.precioARS = data.precio;
        this.precioUSD = data.precio / 320;
        this.hasStock = data.stock > 0;
        this.stock = data.stock;
        this.id = data._id || '';
    }
}
exports.ProductsDTO = ProductsDTO;
