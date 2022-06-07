import 'dotenv/config';
import server from './services/server';
import { initMongoDB } from './services/database';
import { initWsServer } from './services/socket';

const init = async () => {
  await initMongoDB();
  const io = initWsServer(server)
  const puerto = process.env.PORT || 8080;

  server.listen(puerto, () => console.log(`SERVER UP ON PORT ${puerto}`));
};

init();