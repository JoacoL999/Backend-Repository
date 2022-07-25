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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dbMongo_1 = require("../../../services/dbMongo");
const prodInterface_1 = require("../prodInterface");
const error_1 = require("../../../services/error");
class ProductDao {
    constructor() {
        this.schema = new mongoose_1.default.Schema({
            nombre: { type: String, required: true },
            precio: { type: Number, required: true },
            stock: { type: Number, required: true },
        });
        this.productos = mongoose_1.default.model('productos', this.schema);
    }
    static getInstance(local = false) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!ProductDao.instance) {
                console.log('Inicializamos DAO Products');
                yield dbMongo_1.MongoDBClient.getConnection(local);
                ProductDao.instance = new ProductDao();
                ProductDao.client = yield dbMongo_1.MongoDBClient.getConnection();
            }
            return ProductDao.instance;
        });
    }
    isValid(id) {
        return ProductDao.client.isValidId(id);
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let output = [];
            if (id) {
                if (!this.isValid(id))
                    throw new error_1.ApiError('Documento no existe', error_1.ErrorStatus.NotFound);
                const document = yield this.productos.findById(id);
                if (document)
                    return new prodInterface_1.ProductsDTO(document);
                else
                    throw new error_1.ApiError('Documento no existe', error_1.ErrorStatus.NotFound);
            }
            output = yield this.productos.find();
            return output.map((aProduct) => new prodInterface_1.ProductsDTO(aProduct));
        });
    }
    add(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newProduct = yield this.productos.create(data);
            return new prodInterface_1.ProductsDTO(newProduct);
        });
    }
    update(id, newProductData) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.productos.findByIdAndUpdate(id, newProductData, {
                new: true,
            });
            if (!result)
                throw new error_1.ApiError('Documento no existe', error_1.ErrorStatus.NotFound);
            return new prodInterface_1.ProductsDTO(result);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.productos.findByIdAndDelete(id);
        });
    }
    query(options) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = {};
            if (options.nombre)
                query.nombre = options.nombre;
            if (options.precio)
                query.precio = options.precio;
            const result = yield this.productos.find(query);
            return result.map((aResult) => new prodInterface_1.ProductsDTO(aResult));
        });
    }
}
exports.default = ProductDao;
