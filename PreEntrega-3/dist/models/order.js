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
const dbCollection = 'order';
// const itemProd = new mongoose.Schema({
//     name: { type: String, required: true },
//     quantity: {type: Number, required: true},
//     price: {type: Number, required: true}
// })
const orderSchema = new mongoose_1.default.Schema({
    userID: { type: String, required: true },
    date: { type: String, default: (0, moment_1.default)().format('MMMM Do YYYY, h:mm:ss a') },
    status: { type: String, required: true },
    total: { type: Number, required: true },
    Items: { type: Object, required: false }
});
class Order {
    constructor() {
        mongoConnection_1.default.getConnection();
        this.order = mongoose_1.default.model(dbCollection, orderSchema);
    }
    getOrder(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.order.findOne({ userID: id });
                if (response.length == 0) {
                    throw new Error('Cart not found');
                }
                return response;
            }
            catch (error) {
                loggers_1.errorLogger.error(error.message);
                throw new Error(`Error getting order: ${error.messages}`);
            }
        });
    }
    createOrder(id, items, total) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.order.create({ userID: id, status: 'Generado', Items: items, total: total });
                return response;
            }
            catch (error) {
                loggers_1.errorLogger.error(error.message);
                throw new Error(`Error creating order: ${error.message}`);
            }
        });
    }
    updateOrder(id, state) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.order.findOneAndUpdate({ userID: id }, { status: state });
                if (!response) {
                    throw new Error('order not found');
                }
                return response;
            }
            catch (error) {
                loggers_1.errorLogger.error(error.message);
                throw new Error(`Error updating order: ${error.message}`);
            }
        });
    }
    deleteOrder(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.order.findOneAndDelete({ userID: id });
                if (!response) {
                    throw new Error('Cart not found');
                }
                return response;
            }
            catch (error) {
                loggers_1.errorLogger.error(error.message);
                throw new Error(`Error deleting order: ${error.message}`);
            }
        });
    }
}
const order = new Order();
exports.default = order;
