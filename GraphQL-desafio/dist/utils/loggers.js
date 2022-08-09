"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.debugLogger = exports.warnLogger = exports.infoLogger = exports.errorLogger = void 0;
const log4js_1 = __importDefault(require("log4js"));
log4js_1.default.configure({
    appenders: {
        error: { type: 'file', filename: 'logs/error.log' },
        info: { type: 'file', filename: 'logs/info.log' },
        warn: { type: 'file', filename: 'logs/warn.log' },
        debug: { type: 'file', filename: 'logs/debug.log' },
        consola: { type: 'console' },
    },
    categories: {
        default: { appenders: ['error', 'consola'], level: 'error' },
        warn: { appenders: ['warn', 'consola'], level: 'warn' },
        info: { appenders: ['info', 'consola'], level: 'info' },
        debug: { appenders: ['debug', 'consola'], level: 'debug' }
    },
});
exports.errorLogger = log4js_1.default.getLogger('error');
exports.infoLogger = log4js_1.default.getLogger('info');
exports.warnLogger = log4js_1.default.getLogger('warn');
exports.debugLogger = log4js_1.default.getLogger('debug');
