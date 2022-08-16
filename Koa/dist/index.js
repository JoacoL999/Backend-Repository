"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./services/server"));
const PORT = 8080;
const server = server_1.default.listen(PORT, () => {
    console.log(`Servidor Koa escuchando en el puerto ${PORT}`);
});
server.on('error', (error) => console.log('Error en Servidor Koa:', error));
