"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = __importDefault(require("../controllers/authController"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const router = (0, express_1.Router)();
router.get('/login', authMiddleware_1.default.authenticate('login'), (req, res) => {
    return res.status(200).json({ msg: 'login successful ' });
});
router.post('/login', authMiddleware_1.default.authenticate('login'), (req, res) => {
    return res.status(200).json({ msg: 'login successful ' });
});
router.post('/signup', authController_1.default.userExists, authMiddleware_1.default.authenticate('signup'), (req, res) => {
    return res.status(200).json({ msg: 'signup successful ' });
});
router.post('/logout', authController_1.default.logout, (req, res) => {
    return res.status(200).json({ msg: 'logout successful' });
});
exports.default = router;
