"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http = __importStar(require("http"));
const routes_1 = __importDefault(require("../routes"));
const path_1 = __importDefault(require("path"));
const loggers_1 = require("./loggers");
const app = (0, express_1.default)();
const publicPath = path_1.default.resolve(__dirname, '../public');
app.use(express_1.default.static(publicPath));
app.use(express_1.default.json());
app.use('/api', routes_1.default);
app.use((req, res) => {
    res.status(404).json({
        msg: 'Ruta no encontrada',
    });
});
const errorHandler = (err, req, res, next) => {
    loggers_1.errorLogger.error(`HUBO UN ERROR ${err.message}`);
    const status = err.statusCode || 500;
    const msg = err.message || 'Internal Server Error';
    const stack = err.stack;
    loggers_1.errorLogger.error(err);
    res.status(status).send({ msg, stack });
};
app.use(errorHandler);
const HTTPServer = http.createServer(app);
exports.default = HTTPServer;
