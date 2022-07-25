"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prodJoiSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.prodJoiSchema = joi_1.default.object({
    nombre: joi_1.default.string().required(),
    precio: joi_1.default.number().required(),
    stock: joi_1.default.number().required()
});
