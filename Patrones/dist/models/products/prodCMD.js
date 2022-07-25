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
const minimist_1 = __importDefault(require("minimist"));
const loggers_1 = require("../../services/loggers");
loggers_1.debugLogger.debug('CMD API RUNNING...');
let productosDao;
function runCmds() {
    return __awaiter(this, void 0, void 0, function* () {
        const argv = (0, minimist_1.default)(process.argv.slice(2));
        const { cmd, id, nombre, precio, stock } = argv;
        const data = {
            id: id,
            nombre: nombre,
            precio: precio,
            stock: stock
        };
        try {
            switch (cmd.toLowerCase()) {
                case 'buscar':
                    loggers_1.debugLogger.debug(cmd);
                    loggers_1.infoLogger.info(yield productosDao.getProduct(id));
                    break;
                case 'agregar':
                    loggers_1.debugLogger.debug(cmd);
                    loggers_1.infoLogger.info(yield productosDao.addProduct(data));
                    break;
                case 'reemplazar':
                    loggers_1.debugLogger.debug(cmd);
                    loggers_1.infoLogger.info(yield productosDao.updateProduct(id, data));
                    break;
                default:
                    loggers_1.errorLogger.error('command not found', cmd);
            }
        }
        catch (error) {
            loggers_1.errorLogger.error(error);
        }
    });
}
exports.default = runCmds;
