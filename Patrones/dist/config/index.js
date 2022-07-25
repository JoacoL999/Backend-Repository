"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersistenceType = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var PersistenceType;
(function (PersistenceType) {
    PersistenceType["Memoria"] = "MEM";
    PersistenceType["MongoAtlas"] = "MONGO-ATLAS";
    PersistenceType["LocalMongo"] = "LOCAL-MONGO";
})(PersistenceType = exports.PersistenceType || (exports.PersistenceType = {}));
exports.default = {
    PORT: process.env.PORT || 8080,
    MONGO_ATLAS_SRV: process.env.MONGO_ATLAS_SRV || 'mongosrv',
    MONGO_LOCAL_SRV: process.env.MONGO_LOCAL_SRV || 'mongoLocalsrv',
    MONGO_ATLAS_DB: process.env.MONGO_ATLAS_DB || 'db',
    PERSISTENCIA: PersistenceType.MongoAtlas,
};
