"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = exports.numCPUs = void 0;
const server_1 = __importDefault(require("./services/server"));
const minimist_1 = __importDefault(require("minimist"));
const dotenv_1 = __importDefault(require("dotenv"));
const cluster_1 = __importDefault(require("cluster"));
const os_1 = __importDefault(require("os"));
const log4js_1 = __importDefault(require("log4js"));
log4js_1.default.configure({
    appenders: {
        error: { type: 'file', filename: './logs/error.log' },
        info: { type: 'file', filename: './logs/info.log' },
        warn: { type: 'file', filename: './logs/warn.log' },
        consola: { type: 'console' },
    },
    categories: {
        default: { appenders: ['error', 'consola'], level: 'error' },
        warn: { appenders: ['warn', 'consola'], level: 'warn' },
        info: { appenders: ['info', 'consola'], level: 'info' },
    },
});
const infoLogger = log4js_1.default.getLogger('info');
const warnLogger = log4js_1.default.getLogger('warn');
dotenv_1.default.config();
const argumentos = (0, minimist_1.default)(process.argv.slice(2));
const modoCluster = argumentos.modo === 'CLUSTER';
exports.numCPUs = os_1.default.cpus().length;
exports.PORT = argumentos.puerto || 8080;
if (modoCluster && cluster_1.default.isPrimary) {
    infoLogger.info(exports.numCPUs);
    infoLogger.info('PID:', process.pid);
    for (let i = 0; 1 < exports.numCPUs; i++) {
        cluster_1.default.fork();
    }
    cluster_1.default.on('exit', (worker, code) => {
        infoLogger.info(`Worker ${worker.process.pid} // code ${code} -- ${Date()}`);
        cluster_1.default.fork();
    });
}
else {
    infoLogger.info(argumentos);
    server_1.default.listen(exports.PORT, () => infoLogger.info(`Servidor express escuchando en el puerto ${exports.PORT} - PID WORKER ${process.pid}`));
}
