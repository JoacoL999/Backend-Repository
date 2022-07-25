"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prodController_1 = require("../models/products/prodController");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const router = (0, express_1.Router)();
router.get('/', (0, express_async_handler_1.default)(prodController_1.ProductController.getProducts));
router.get('/:id', (0, express_async_handler_1.default)(prodController_1.ProductController.exists), (0, express_async_handler_1.default)(prodController_1.ProductController.getProductById));
router.post('/', prodController_1.ProductController.validate, (0, express_async_handler_1.default)(prodController_1.ProductController.addProducts));
router.put('/:id', prodController_1.ProductController.exists, prodController_1.ProductController.validate, (0, express_async_handler_1.default)(prodController_1.ProductController.updateProducts));
router.delete('/:id', prodController_1.ProductController.exists, (0, express_async_handler_1.default)(prodController_1.ProductController.deleteProducts));
exports.default = router;
