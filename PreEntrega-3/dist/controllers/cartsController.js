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
const cartsAPI_1 = __importDefault(require("../apis/cartsAPI"));
const msgController_1 = __importDefault(require("./msgController"));
class CartsController {
    hasIdParam(req, res, next) {
        req.params.id ? next() : res.status(404).json({ msg: 'missing id' });
    }
    getCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield cartsAPI_1.default.getCart(req.params.id);
                msgController_1.default.wsp(response);
                msgController_1.default.sendEmail(response);
                return res.status(200).json(response);
            }
            catch (error) {
                return res.status(404).json({ error: error.message });
            }
        });
    }
    createCart(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield cartsAPI_1.default.createCart(id);
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    updateCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield cartsAPI_1.default.updateCart(req.params.id, req.body);
                return res.status(200).json(response);
            }
            catch (error) {
                return res.status(404).json({ error: error.message });
            }
        });
    }
    emptyCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield cartsAPI_1.default.emptyCart(req.params.id);
                return res.status(200).json(response);
            }
            catch (error) {
                return res.status(404).json({ error: error.message });
            }
        });
    }
}
const cartsController = new CartsController();
exports.default = cartsController;
