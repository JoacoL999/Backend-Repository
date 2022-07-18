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
const carts_1 = __importDefault(require("../models/carts"));
class CartsAPI {
    getCart(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield carts_1.default.getCart(id);
        });
    }
    createCart(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield carts_1.default.createCart(id);
        });
    }
    updateCart(id, cart) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield carts_1.default.updateCart(id, cart);
        });
    }
    emptyCart(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield carts_1.default.emptyCart(id);
        });
    }
}
const cartsAPI = new CartsAPI();
exports.default = cartsAPI;
