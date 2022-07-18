"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const games_1 = __importDefault(require("./games"));
const auth_1 = __importDefault(require("./auth"));
const carts_1 = __importDefault(require("./carts"));
const router = (0, express_1.Router)();
router.use('/game', games_1.default);
router.use('/auth', auth_1.default);
router.use('/cart', carts_1.default);
router.use('/', (req, res) => {
    res.status(404).json({
        message: 'Invalid API endpoint'
    });
});
exports.default = router;
