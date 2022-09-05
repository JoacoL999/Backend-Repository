"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orderController_1 = __importDefault(require("../controllers/orderController"));
const router = (0, express_1.Router)();
router.get('/:id', orderController_1.default.hasIdParam, orderController_1.default.getOrder);
router.put('/:id', orderController_1.default.hasIdParam, orderController_1.default.updateOrder);
router.delete('/:id', orderController_1.default.hasIdParam, orderController_1.default.deleteOrder);
exports.default = router;
