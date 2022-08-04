"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cartsController_1 = __importDefault(require("../controllers/cartsController"));
const router = (0, express_1.Router)();
router.get('/:id', cartsController_1.default.hasIdParam, cartsController_1.default.getCart);
router.put('/:id', cartsController_1.default.hasIdParam, cartsController_1.default.updateCart);
router.delete('/:id', cartsController_1.default.hasIdParam, cartsController_1.default.emptyCart);
exports.default = router;
