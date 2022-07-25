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
const config_1 = __importDefault(require("../../config"));
const loggers_1 = require("../../services/loggers");
const prodFactory_1 = require("./prodFactory");
const prodSchema_1 = require("./prodSchema");
class ProductsAPI {
    constructor(dao) {
        this.products = dao;
    }
    static getInstance() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.instance) {
                loggers_1.infoLogger.info('Inicializando api de productos');
                const dao = yield prodFactory_1.ProductsFactoryDAO.get(config_1.default.PERSISTENCIA);
                ProductsAPI.instance = new ProductsAPI(dao);
            }
            return ProductsAPI.instance;
        });
    }
    validateSchema(data) {
        const result = prodSchema_1.prodJoiSchema.validate(data);
        if (result.error) {
            return {
                valid: false,
                errors: result.error.details,
            };
        }
        return {
            valid: true,
        };
    }
    getProduct(id) {
        return this.products.get(id);
    }
    addProduct(data) {
        return this.products.add(data);
    }
    updateProduct(id, newProductData) {
        return this.products.update(id, newProductData);
    }
    deleteProduct(id) {
        return this.products.delete(id);
    }
}
exports.default = ProductsAPI;
