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
const usersAPI_1 = __importDefault(require("../apis/usersAPI"));
class AuthController {
    userExists(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield usersAPI_1.default.getUserByEmail(ctx.params.email);
            if (user)
                return ctx.body = { message: 'User already registered' };
            next();
        });
    }
    logout(ctx, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            (_a = ctx.session) === null || _a === void 0 ? void 0 : _a.destroy;
            return ctx.body = { message: 'User logget out' };
        });
    }
}
const authController = new AuthController();
exports.default = authController;
