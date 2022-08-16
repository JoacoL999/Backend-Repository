"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const cartsController_1 = __importDefault(require("../controllers/cartsController"));
const router = new koa_router_1.default({
    prefix: '/cart'
});
router.get('/:id', cartsController_1.default.hasIdParam, cartsController_1.default.getCart);
router.put('/:id', cartsController_1.default.hasIdParam, cartsController_1.default.updateCart);
router.delete('/:id', cartsController_1.default.hasIdParam, cartsController_1.default.emptyCart);
exports.default = router.routes();
