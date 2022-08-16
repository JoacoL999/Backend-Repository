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
const moment_1 = __importDefault(require("moment"));
const mongoConnection_1 = __importDefault(require("../utils/mongoConnection"));
const loggers_1 = require("../utils/loggers");
const dbCollection = 'carts';
const cartSchema = new mongoose_1.default.Schema({
    user: { type: String, required: true },
    date: { type: String, default: (0, moment_1.default)().format('MMMM Do YYYY, h:mm:ss a') },
    phoneNum: { type: String, required: true },
    carts: { type: Array, required: false }
});
class Carts {
    constructor() {
        mongoConnection_1.default.getConnection();
        this.carts = mongoose_1.default.model(dbCollection, cartSchema);
    }
    getCart(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.carts.findOne({ user: id });
                if (response.length == 0) {
                    throw new Error('Cart not found');
                }
                return response;
            }
            catch (error) {
                loggers_1.errorLogger.error(error.message);
                throw new Error(`Error getting carts: ${error.messages}`);
            }
        });
    }
    createCart(id, phone) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.carts.create({ user: id, phoneNum: phone, carts: [] });
                return response;
            }
            catch (error) {
                loggers_1.errorLogger.error(error.message);
                throw new Error(`Error creating cart: ${error.message}`);
            }
        });
    }
    updateCart(id, cart) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.carts.findOneAndUpdate({ user: id }, cart);
                if (!response) {
                    throw new Error('Cart not found');
                }
                return response;
            }
            catch (error) {
                loggers_1.errorLogger.error(error.message);
                throw new Error(`Error updating cart: ${error.message}`);
            }
        });
    }
    emptyCart(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.carts.findOneAndUpdate({ user: id }, { carts: [] });
                if (!response) {
                    throw new Error('Cart not found');
                }
                return response;
            }
            catch (error) {
                loggers_1.errorLogger.error(error.message);
                throw new Error(`Error emptying cart: ${error.message}`);
            }
        });
    }
}
const carts = new Carts();
exports.default = carts;
