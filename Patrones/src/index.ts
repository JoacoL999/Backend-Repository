import Config from './config';
import ExpressServer from './services/server';
import runCmds from './models/products/prodCMD'

ExpressServer.listen(Config.PORT, () =>
  console.log(`Server UP on ${Config.PORT}`)
);

runCmds()