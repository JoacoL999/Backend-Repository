"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config"));
const getArgs_1 = require("./utils/getArgs");
const server_1 = __importDefault(require("./services/server"));
const os_1 = __importDefault(require("os"));
const cluster_1 = __importDefault(require("cluster"));
const portfinder_1 = __importDefault(require("portfinder"));
const loggers_1 = require("./utils/loggers");
const portParam = getArgs_1.portArgument || config_1.default.PORT;
const clusterArgument = getArgs_1.ClusterArgument || false;
const numCPUs = os_1.default.cpus().length;
loggers_1.debugLogger.debug(`CLUSTER ==> ${getArgs_1.ClusterArgument}`);
if (cluster_1.default.isMaster && clusterArgument) {
    loggers_1.debugLogger.debug(`NUMERO DE CPUS ===> ${numCPUs}`);
    loggers_1.infoLogger.info(`PID MASTER ${process.pid}`);
    for (let i = 0; i < numCPUs; i++) {
        cluster_1.default.fork();
    }
    cluster_1.default.on('exit', (worker) => {
        loggers_1.debugLogger.debug(`Worker ${worker.process.pid} died at ${Date()}`);
        cluster_1.default.fork();
    });
}
else {
    portfinder_1.default.getPort({
        port: Number(portParam),
        stopPort: Number(portParam) + 50 // maximum port
    }, function (err, result) {
        if (err) {
            loggers_1.errorLogger.error(err.message);
        }
        server_1.default.listen(result, () => loggers_1.infoLogger.info(`Servidor express escuchando en el puerto ${result} - PID WORKER ${process.pid}`));
    });
}
process.on('exit', (code) => {
    loggers_1.debugLogger.debug(`Exit ==> El proceso termino con codigo ${code}\n\n`);
});
