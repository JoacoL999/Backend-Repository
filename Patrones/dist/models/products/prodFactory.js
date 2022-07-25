"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsFactoryDAO = void 0;
const memDao_1 = __importDefault(require("./DAOs/memDao"));
const mongoDao_1 = __importDefault(require("./DAOs/mongoDao"));
const loggers_1 = require("../../services/loggers");
const config_1 = require("../../config");
class ProductsFactoryDAO {
    static get(type) {
        switch (type) {
            case config_1.PersistenceType.Memoria:
                loggers_1.infoLogger.info('Retornando Instancia Products Memoria');
                return memDao_1.default.getInstance();
            case config_1.PersistenceType.MongoAtlas:
                loggers_1.infoLogger.info('Retornando Instancia Products Mongo Atlas');
                return mongoDao_1.default.getInstance();
            case config_1.PersistenceType.LocalMongo:
                loggers_1.infoLogger.info('Retornando Instancia Products Mongo Local');
                return mongoDao_1.default.getInstance(true);
            default:
                loggers_1.infoLogger.info('Retornando Instancia Products Default');
                return mongoDao_1.default.getInstance();
        }
    }
}
exports.ProductsFactoryDAO = ProductsFactoryDAO;
