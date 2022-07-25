"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const loggers_1 = require("../../../services/loggers");
const error_1 = require("../../../services/error");
const prodInterface_1 = require("../prodInterface");
const faker_1 = require("@faker-js/faker");
class ProductDao {
    constructor() {
        this.productos = [];
        const mockData = [
            { _id: '1', nombre: faker_1.faker.commerce.product(), precio: 250, stock: faker_1.faker.datatype.number({ max: 20 }) },
            { _id: '2', nombre: faker_1.faker.commerce.product(), precio: 350, stock: faker_1.faker.datatype.number({ max: 20 }) },
            { _id: '3', nombre: faker_1.faker.commerce.product(), precio: 5000, stock: faker_1.faker.datatype.number({ max: 20 }) },
        ];
        mockData.forEach((aMock) => this.productos.push(aMock));
    }
    static getInstance(local = false) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!ProductDao.instance) {
                loggers_1.debugLogger.debug('DAO products running...');
                ProductDao.instance = new ProductDao();
            }
            return ProductDao.instance;
        });
    }
    findIndex(id) {
        return this.productos.findIndex((aProduct) => aProduct._id == id);
    }
    find(id) {
        return this.productos.find((aProduct) => aProduct._id === id);
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (id) {
                const index = this.findIndex(id);
                if (index < 0)
                    throw new error_1.ApiError('Documento no existe', error_1.ErrorStatus.NotFound);
                return new prodInterface_1.ProductsDTO(this.productos[index]);
            }
            return this.productos.map((aResult) => new prodInterface_1.ProductsDTO(aResult));
        });
    }
    add(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!data.nombre || !data.precio || !data.stock)
                throw new error_1.ApiError('Invalid Data', error_1.ErrorStatus.BadRequest);
            const newItem = Object.assign({ _id: (this.productos.length + 1).toString() }, data);
            this.productos.push(newItem);
            return new prodInterface_1.ProductsDTO(newItem);
        });
    }
    update(id, newProductData) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = this.findIndex(id);
            const oldProduct = this.productos[index];
            const updatedProduct = Object.assign(Object.assign({}, oldProduct), newProductData);
            this.productos.splice(index, 1, updatedProduct);
            return new prodInterface_1.ProductsDTO(updatedProduct);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = this.findIndex(id);
            this.productos.splice(index, 1);
        });
    }
    query(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = [];
            if (options.nombre)
                query.push((aProduct) => aProduct.nombre == options.nombre);
            return this.productos
                .filter((aProduct) => query.every((x) => x(aProduct)))
                .map((aResult) => new prodInterface_1.ProductsDTO(aResult));
        });
    }
}
exports.default = ProductDao;
