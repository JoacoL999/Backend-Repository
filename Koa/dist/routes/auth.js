"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const authController_1 = __importDefault(require("../controllers/authController"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const router = new koa_router_1.default({
    prefix: '/auth'
});
router.get('/login', authMiddleware_1.default.authenticate('login'), (ctx, next) => {
    return ctx.body = {
        status: 'success',
        message: 'logueado',
    };
});
router.post('/login', authMiddleware_1.default.authenticate('login'), (ctx, next) => {
    ctx.body = {
        status: 'success',
        message: `Logueado`,
    };
});
router.post('/signup', authController_1.default.userExists, authMiddleware_1.default.authenticate('signup'), (ctx, next) => {
    ctx.body = {
        status: 'success',
        message: `Te has registrado!!`,
    };
});
router.post('/logout', authController_1.default.logout, (ctx, next) => {
    ctx.body = {
        status: 'success',
        message: `logout successful`,
    };
});
exports.default = router.routes();
