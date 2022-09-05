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
const order_1 = __importDefault(require("../models/order"));
class OrderAPI {
    getOrder(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield order_1.default.getOrder(id);
        });
    }
    createOrder(id, items, total) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield order_1.default.createOrder(id, items, total);
        });
    }
    updateOrder(id, state) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield order_1.default.updateOrder(id, state);
        });
    }
    deleteOrder(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield order_1.default.deleteOrder(id);
        });
    }
}
const orderAPI = new OrderAPI();
exports.default = orderAPI;
