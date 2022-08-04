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
exports.emptyCart = exports.updateCart = exports.newUser = exports.getGames = void 0;
const axios_1 = __importDefault(require("axios"));
const getGames = () => {
    axios_1.default
        .get('http://localhost:8000/api/game')
        .then((res) => {
        console.log(res.data);
    })
        .catch((error) => {
        console.error(error.message);
    });
};
exports.getGames = getGames;
const user = {
    firstName: "Joaquin",
    lastName: "Lucchetti",
    email: "joaquinlucchetti@gmail.com",
    age: 22,
    isAdmin: false,
    password: "asd123",
    phoneNum: "+5492216255554",
};
const user1 = {
    firstName: "Jeremias",
    lastName: "Lucchetti",
    email: "anakin_lla@hotmail.com",
    age: 22,
    isAdmin: true,
    password: "asd123",
    phoneNum: "+5492216255554",
};
const url = "http://localhost:8000/api/auth/signup";
const newUser = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield axios_1.default.post(url, user);
        console.log(res.data);
    }
    catch (error) {
        console.log(error);
    }
});
exports.newUser = newUser;
const userCart = 'anakin_lla@hotmail.com';
const urlCart = `http://localhost:8000/api/cart/${userCart}`;
const R6 = { name: "Tom Clancy's Rainbow Six® Siege", price: 999 };
const GOW = { name: "God of War", price: 4199 };
const HZD = { name: 'Horizon Zero Dawn Complete Edition', price: 2100 };
const updateCart = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield axios_1.default.put(urlCart, { $push: { carts: HZD } });
        console.log(res.data);
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateCart = updateCart;
const emptyCart = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield axios_1.default.delete(urlCart);
        console.log(res.data);
    }
    catch (error) {
        console.log(error);
    }
});
exports.emptyCart = emptyCart;
