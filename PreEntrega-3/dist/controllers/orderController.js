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
const orderAPI_1 = __importDefault(require("../apis/orderAPI"));
class OrderController {
    hasIdParam(req, res, next) {
        req.params.id ? next() : res.status(404).json({ msg: 'missing id' });
    }
    getOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield orderAPI_1.default.getOrder(req.params.id);
                return res.status(200).json(response);
            }
            catch (error) {
                return res.status(404).json({ error: error.message });
            }
        });
    }
    createOrder(id, items) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(items);
                let total = 0;
                items.forEach((game) => {
                    let eachG = game.price * game.quantity;
                    total += eachG;
                    console.log(total);
                    return total;
                });
                yield orderAPI_1.default.createOrder(id, items, total);
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    updateOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { status } = req.body;
                console.log(status);
                let stat;
                if (status === 2) {
                    stat = 'Pagado';
                }
                else if (status === 3) {
                    stat = 'Enviando';
                }
                else if (status === 4) {
                    stat = 'Finalizado';
                }
                const response = yield orderAPI_1.default.updateOrder(req.params.id, stat);
                return res.status(200).json(response);
            }
            catch (error) {
                return res.status(404).json({ error: error.message });
            }
        });
    }
    deleteOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield orderAPI_1.default.deleteOrder(req.params.id);
                return res.status(200).json(response);
            }
            catch (error) {
                return res.status(404).json({ error: error.message });
            }
        });
    }
}
const orderController = new OrderController();
exports.default = orderController;
