import Server from './services/server';
import minimist from 'minimist';
import dotenv from 'dotenv';
import cluster from 'cluster'
import os from 'os'
import log4js from 'log4js';





log4js.configure({
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

const infoLogger = log4js.getLogger('info');
const warnLogger = log4js.getLogger('warn');




dotenv.config();

const argumentos = minimist(process.argv.slice(2));
const modoCluster = argumentos.modo === 'CLUSTER';

export const numCPUs = os.cpus().length;
export const PORT = argumentos.puerto || 8080;

if (modoCluster && cluster.isPrimary) {
  infoLogger.info(numCPUs);
  infoLogger.info('PID:', process.pid)

  for (let i = 0; 1 < numCPUs; i++) {
    cluster.fork()
  }

  cluster.on('exit', (worker, code) => {
    infoLogger.info(`Worker ${worker.process.pid} // code ${code} -- ${Date()}`)
    cluster.fork()
  })
} else {

  infoLogger.info(argumentos);
  Server.listen(PORT, () =>
  infoLogger.info(
    `Servidor express escuchando en el puerto ${PORT} - PID WORKER ${process.pid}`
  )
);

}
