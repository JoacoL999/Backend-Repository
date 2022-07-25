import express from 'express';
import * as http from 'http';
import mainRouter from '../routes';
import path from 'path';
import { errorLogger } from './loggers';

import { ErrorRequestHandler } from 'express';
const app = express();

const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

app.use(express.json());

app.use('/api', mainRouter);

app.use((req, res) => {
  res.status(404).json({
    msg: 'Ruta no encontrada',
  });
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    errorLogger.error(`HUBO UN ERROR ${err.message}`);
    const status = err.statusCode || 500;
    const msg = err.message || 'Internal Server Error';
    const stack = err.stack;
    errorLogger.error(err);
    res.status(status).send({ msg, stack });
};

app.use(errorHandler);

const HTTPServer = http.createServer(app);

export default HTTPServer;