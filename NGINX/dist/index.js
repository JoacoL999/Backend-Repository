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
dotenv_1.default.config();
const argumentos = (0, minimist_1.default)(process.argv.slice(2));
const modoCluster = argumentos.modo === 'CLUSTER';
exports.numCPUs = os_1.default.cpus().length;
exports.PORT = argumentos.puerto || 8080;
if (modoCluster && cluster_1.default.isPrimary) {
    console.log(exports.numCPUs);
    console.log('PID:', process.pid);
    for (let i = 0; 1 < exports.numCPUs; i++) {
        cluster_1.default.fork();
    }
    cluster_1.default.on('exit', (worker, code) => {
        console.log(`Worker ${worker.process.pid} // code ${code} -- ${Date()}`);
        cluster_1.default.fork();
    });
}
else {
    console.log(argumentos);
    server_1.default.listen(exports.PORT, () => console.log(`Servidor express escuchando en el puerto ${exports.PORT} - PID WORKER ${process.pid}`));
}
