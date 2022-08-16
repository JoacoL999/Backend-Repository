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
const koa_bodyparser_1 = require("koa-bodyparser");
const req = koa_bodyparser_1.Request;
class CartsController {
    hasIdParam(ctx, next) {
        ctx.params.id ? next() : ctx.body = {
            status: 'success',
            message: 'missing id',
        };
    }
    getCart(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield cartsAPI_1.default.getCart(ctx.params.id);
                msgController_1.default.wsp(response);
                msgController_1.default.sendEmail(response);
                return ctx.body = response;
            }
            catch (error) {
                return error.message;
            }
        });
    }
    createCart(id, phone) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield cartsAPI_1.default.createCart(id, phone);
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    updateCart(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield cartsAPI_1.default.updateCart(ctx.params.id, ctx.request.body);
                return response;
            }
            catch (error) {
                return error.message;
            }
        });
    }
    emptyCart(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield cartsAPI_1.default.emptyCart(ctx.params.id);
                return response;
            }
            catch (error) {
                return error.message;
            }
        });
    }
}
const cartsController = new CartsController();
exports.default = cartsController;
