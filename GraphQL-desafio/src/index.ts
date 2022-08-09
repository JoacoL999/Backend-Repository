import Config from './config'
import { portArgument, ClusterArgument } from './utils/getArgs'
import myServer from './services/server'
import os from 'os'
import cluster from 'cluster'
import portFinder from  'portfinder'
import { errorLogger, infoLogger, warnLogger, debugLogger } from './utils/loggers'

const portParam = portArgument || Config.PORT
const clusterArgument = ClusterArgument || false

const numCPUs = os.cpus().length

debugLogger.debug(`CLUSTER ==> ${ClusterArgument}`)

if (cluster.isMaster && clusterArgument) {
    debugLogger.debug(`NUMERO DE CPUS ===> ${numCPUs}`)
    infoLogger.info(`PID MASTER ${process.pid}`)
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork()
    }
    cluster.on('exit', (worker: any) => {
      debugLogger.debug(`Worker ${worker.process.pid} died at ${Date()}`)
      cluster.fork()
    })
  } else {
    portFinder.getPort(
      {
        port: Number(portParam), // minimum port
        stopPort: Number(portParam) + 50 // maximum port
      },
      function (err, result) {
        if (err) {
          errorLogger.error(err.message)
        }
        myServer.listen(result, () =>
          infoLogger.info(`Servidor express escuchando en el puerto ${result} - PID WORKER ${process.pid}`)
        )
      }
    )
  }

  process.on('exit', (code) => {
    debugLogger.debug(`Exit ==> El proceso termino con codigo ${code}\n\n`)
  })