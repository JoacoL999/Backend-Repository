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
exports.connectionURL = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../config"));
mongoose_1.default.Promise = global.Promise;
exports.connectionURL = `mongodb+srv://${config_1.default.MONGO_ATLAS_USER}:${config_1.default.MONGO_ATLAS_PASSWORD}@${config_1.default.MONGO_ATLAS_CLUSTER}/${config_1.default.MONGO_ATLAS_DBNAME}?retryWrites=true&w=majority`;
const loggers_1 = require("./loggers");
class mongoConnect {
    constructor() {
        this.mongoURL = exports.connectionURL;
        this.connection = '';
    }
    getConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.connection) {
                return this.connection;
            }
            else {
                loggers_1.debugLogger.debug('Connecting');
                try {
                    this.connection = mongoose_1.default.Connection;
                    yield mongoose_1.default.connect(this.mongoURL);
                    loggers_1.infoLogger.info('Connected');
                    return this.connection;
                }
                catch (error) {
                    loggers_1.errorLogger.error('Connection error:', error);
                    loggers_1.errorLogger.error(error);
                }
                return this.connection;
            }
        });
    }
    closeConnection() {
        mongoose_1.default.disconnect();
    }
}
const MongoDB = new mongoConnect();
exports.default = MongoDB;
