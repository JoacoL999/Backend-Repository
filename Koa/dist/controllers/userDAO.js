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
const users_1 = require("../models/users");
const mongoConnection_1 = __importDefault(require("../utils/mongoConnection"));
const mongoose_1 = __importDefault(require("mongoose"));
const users_2 = __importDefault(require("../models/users"));
class UserDao {
    constructor() {
        this.UserDao = users_1.UsersModel;
        this.users = users_2.default;
    }
    static getInstance() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!UserDao.instance) {
                console.log('Inicializamos DAO Products');
                yield mongoConnection_1.default.getConnection();
                UserDao.instance = new UserDao();
            }
            return UserDao.instance;
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield mongoose_1.default.disconnect();
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let output = [];
            if (id) {
                if (mongoose_1.default.isValidObjectId(id)) {
                    const document = yield this.users.getUserById(id);
                    if (document)
                        output.push(document);
                }
            }
            else {
                output = yield this.UserDao.find();
            }
            return output;
        });
    }
    add(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = yield this.users.postUser(data);
            console.log('\n\n\n new product');
            console.log(newUser);
            return newUser;
        });
    }
    update(id, newUser) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.users.updateUser(id, newUser);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.users.deleteUser(id);
        });
    }
}
exports.default = UserDao;
