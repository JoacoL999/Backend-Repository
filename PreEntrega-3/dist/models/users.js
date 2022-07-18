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
exports.dbCollection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoConnection_1 = __importDefault(require("../utils/mongoConnection"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const loggers_1 = require("../utils/loggers");
exports.dbCollection = 'users';
const userSchema = new mongoose_1.default.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: Number, required: true },
    isAdmin: { type: Boolean, required: false },
    password: { type: String, required: true },
    phoneNum: { type: String, required: true },
});
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        const hash = yield bcrypt_1.default.hash(user.password, 15);
        this.password = hash;
        next();
    });
});
userSchema.methods.isValidPassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        const compare = yield bcrypt_1.default.compare(password, user.password);
        return compare;
    });
};
class Users {
    constructor() {
        mongoConnection_1.default.getConnection();
        this.users = mongoose_1.default.model(exports.dbCollection, userSchema);
    }
    getUser() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.users.find();
                return response;
            }
            catch (error) {
                loggers_1.errorLogger.error(error.message);
                throw new Error(`Error getting users: ${error.message}`);
            }
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.users.findById(id);
                return response;
            }
            catch (error) {
                loggers_1.errorLogger.error(error.message);
                throw new Error(`Error gettin user: ${error.message}`);
            }
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.users.findOne({ email: email });
                return response;
            }
            catch (error) {
                loggers_1.errorLogger.error(error.message);
                throw new Error(`Error getting user: ${error.message}`);
            }
        });
    }
    postUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = new this.users(user);
                yield newUser.save();
                return newUser;
            }
            catch (error) {
                loggers_1.errorLogger.error(error.message);
                throw new Error(`Error creating user: ${error.message}`);
            }
        });
    }
    updateUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.users.findByIdAndUpdate(user._id, user);
                return response;
            }
            catch (error) {
                loggers_1.errorLogger.error(error.message);
                throw new Error(`Error updating user: ${error.message}`);
            }
        });
    }
    validateUserPassword(user, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.users.findOne({ email: user.email });
            if (!response)
                return false;
            const compare = yield bcrypt_1.default.compare(password, response.password);
            if (!compare)
                return false;
            return true;
        });
    }
}
const users = new Users();
exports.default = users;
