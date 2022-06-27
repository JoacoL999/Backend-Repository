import Server from './services/server';
import minimist from 'minimist';
import dotenv from 'dotenv';
import cluster from 'cluster'
import os from 'os'

dotenv.config();

const argumentos = minimist(process.argv.slice(2));
const modoCluster = argumentos.modo === 'CLUSTER';

export const numCPUs = os.cpus().length;
export const PORT = argumentos.puerto || 8080;

if (modoCluster && cluster.isPrimary) {
  console.log(numCPUs);
  console.log('PID:', process.pid)

  for (let i = 0; 1 < numCPUs; i++) {
    cluster.fork()
  }

  cluster.on('exit', (worker, code) => {
    console.log(`Worker ${worker.process.pid} // code ${code} -- ${Date()}`)
    cluster.fork()
  })
} else {

  console.log(argumentos);
  Server.listen(PORT, () =>
  console.log(
    `Servidor express escuchando en el puerto ${PORT} - PID WORKER ${process.pid}`
  )
);

}













