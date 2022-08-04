"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGames = void 0;
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
