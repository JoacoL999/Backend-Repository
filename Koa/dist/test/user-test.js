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
const loggers_1 = require("../utils/loggers");
const userDAO_1 = __importDefault(require("../controllers/userDAO"));
const bcrypt_1 = __importDefault(require("bcrypt"));
describe('User TEST', () => {
    let userTest;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        loggers_1.debugLogger.debug('beforeAll running');
        userTest = yield userDAO_1.default.getInstance();
        yield users_1.UsersModel.deleteMany();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        loggers_1.debugLogger.debug('afterEach running');
        yield users_1.UsersModel.deleteMany();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        console.log('afterAll running');
        yield userTest.disconnect();
    }));
    describe('userDao Get', () => {
        it('waiting an empty array without req an id and you have an empty DB', () => __awaiter(void 0, void 0, void 0, function* () {
            const expectedRes = [];
            const data = yield userTest.get();
            expect(data).toEqual(expectedRes);
        }));
        it('waiting an object as i want to request if the id is valid', () => __awaiter(void 0, void 0, void 0, function* () {
            const objectData = {
                firstName: "Jeremias",
                lastName: "Lucchetti",
                email: "anakin_lla@hotmail.com",
                age: 22,
                isAdmin: false,
                password: "asd123",
                phoneNum: "+5492216255554",
            };
            const product = yield users_1.UsersModel.create(objectData);
            const data = yield userTest.get(product._id);
            expect(data[0]._id).toEqual(product._id);
            expect(data[0].firstName).toEqual(objectData.firstName);
            expect(data[0].lastName).toEqual(objectData.lastName);
            expect(data[0].email).toEqual(objectData.email);
            expect(data[0].age).toEqual(objectData.age);
            expect(data[0].isAdmin).toEqual(objectData.isAdmin);
            expect(bcrypt_1.default.compare(data[0].password, objectData.password)).toEqual(bcrypt_1.default.compare(data[0].password, objectData.password));
            expect(data[0].phoneNum).toEqual(objectData.phoneNum);
        }));
    });
    describe('UserDao Add', () => {
        it('should save successfully a new user', () => __awaiter(void 0, void 0, void 0, function* () {
            const newUser = {
                firstName: "Anakin",
                lastName: "Skywalker",
                email: "asd@gmail.com",
                age: 22,
                isAdmin: false,
                password: "asd123",
                phoneNum: "+5492216255554",
            };
            const result = yield userTest.add(newUser);
            expect(result.firstName).toEqual(newUser.firstName);
            expect(result.lastName).toEqual(newUser.lastName);
            expect(result.email).toEqual(newUser.email);
            expect(result.age).toEqual(newUser.age);
            expect(result.isAdmin).toEqual(newUser.isAdmin);
            expect(bcrypt_1.default.compare(result.password, newUser.password)).toEqual(bcrypt_1.default.compare(result.password, newUser.password));
            expect(result.phoneNum).toEqual(newUser.phoneNum);
            expect(result._id).toBeDefined();
        }));
    });
    describe('UserDao Update', () => {
        it('should update succesfully a user', () => __awaiter(void 0, void 0, void 0, function* () {
            const testUser = {
                firstName: "Anakin",
                lastName: "Skywalker",
                email: "asd@gmail.com",
                age: 22,
                isAdmin: false,
                password: "asd123",
                phoneNum: "+5492216255554",
            };
            const product = yield users_1.UsersModel.create(testUser);
            const newData = {
                firstName: "Darth",
                lastName: "Vader",
                email: "anakin@gmail.com",
                age: 47,
                isAdmin: true,
                password: "eee3",
                phoneNum: "+5492216255554",
            };
            const result = yield userTest.update(product._id, newData);
            expect(result.lastName).toEqual(newData.lastName);
            expect(result.firstName).toEqual(newData.firstName);
        }));
    });
    describe('UserDao Delete', () => {
        it('should delete succesfully an user', () => __awaiter(void 0, void 0, void 0, function* () {
            const testUser = {
                firstName: "Anakin",
                lastName: "Skywalker",
                email: "asd@gmail.com",
                age: 22,
                isAdmin: false,
                password: "asd123",
                phoneNum: "+5492216255554",
            };
            const product = yield users_1.UsersModel.create(testUser);
            yield userTest.delete(product._id);
            const result = yield userTest.get(product._id);
            expect(result).toEqual([]);
        }));
    });
});
