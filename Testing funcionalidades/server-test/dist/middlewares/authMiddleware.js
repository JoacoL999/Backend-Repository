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
exports.signupFunc = exports.loginFunc = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const usersAPI_1 = __importDefault(require("../apis/usersAPI"));
const loggers_1 = require("../utils/loggers");
const cartsController_1 = __importDefault(require("../controllers/cartsController"));
const strategyOptions = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
};
const login = (req, email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield usersAPI_1.default.getUserByEmail(email);
    const validPassword = yield usersAPI_1.default.validateUserPassword(user, password);
    if (!user || !validPassword) {
        loggers_1.errorLogger.error('User not found' + email);
        return done(null, false, { message: 'Invalid Email/Password' });
    }
    loggers_1.infoLogger.info('User logger' + email);
    return done(null, user);
});
const signup = (req, email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, age, isAdmin, password, phoneNum } = req.body;
        const user = { firstName, lastName, email, age, isAdmin, password, phoneNum };
        const newUser = yield usersAPI_1.default.postUser(user);
        loggers_1.infoLogger.info('User created!', newUser);
        cartsController_1.default.createCart(user.email, user.phoneNum);
        return done(null, newUser);
    }
    catch (error) {
        loggers_1.errorLogger.error('Error creating new USER:', error);
        return done(null, false, { message: error.message });
    }
});
exports.loginFunc = new passport_local_1.Strategy(strategyOptions, login);
exports.signupFunc = new passport_local_1.Strategy(strategyOptions, signup);
passport_1.default.serializeUser((user, done) => {
    done(null, user.email);
});
passport_1.default.deserializeUser((email, done) => {
    usersAPI_1.default.getUserByEmail(email).then((user) => {
        return done(null, user);
    });
});
exports.default = passport_1.default;
