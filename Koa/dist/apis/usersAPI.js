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
const users_1 = __importDefault(require("../models/users"));
class UsersAPI {
    getUserById(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield users_1.default.getUserById(user);
        });
    }
    getUserByEmail(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield users_1.default.getUserByEmail(user);
        });
    }
    postUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield users_1.default.postUser(user);
        });
    }
    updateUser(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield users_1.default.updateUser(id, user);
        });
    }
    validateUserPassword(user, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield users_1.default.validateUserPassword(user, password);
        });
    }
}
const usersAPI = new UsersAPI();
exports.default = usersAPI;
