import express from 'express';
import { PORT } from '../index';
import { numCPUs } from '../index';
import compression from 'compression';
import data from '../data';
import log4js from 'log4js';
import { isPrime } from '../utils';



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


const app = express();

app.get('/info/compressed', compression(), (req, res) => {
  res.send(data);
});

app.get('/info/normal',(req, res) => {
  res.send(data);
});

app.get('/', (req, res) => {
  infoLogger.info('Resolving / endpoint');
  res.json({
    pid: process.pid,
    msg: `HOLA desde puerto ${PORT}`,
  });
});


app.get('/api/randoms', (req, res) => {
  infoLogger.info('Resolving / endpoint');
  res.json({
    pid: process.pid,
    msg: `HOLA desde puerto ${PORT}`,
  });
});

app.get('/info', (req, res) => {

  res.json({
    CantidadProcesadores: numCPUs,  
    msg: 'Funcionando'
   });

   data.forEach(data => {

    console.log(data._id)
    console.log(data.guid)
    console.log(data.balance)
    console.log(data.address)
    console.log(data.registered)
    console.log(data.greeting)
    console.log(data.favoriteFruit)
  });

});


app.get('/slow', function (req, res) {
  warnLogger.warn(`PID => ${process.pid} will work slow`);
  let sum = 0;
  for (let i = 0; i < 6e9; i++) {
    sum += i;
  }

  res.json({
    pid: process.pid,
    sum,
  });
});

app.get('/muerte', (req, res) => {
  res.json({ msg: 'OK' });
  warnLogger.warn(`PID => ${process.pid} will die`);
  process.exit(0);
});


app.get('/prime', (req, res) => {
  const primes = [];
  const max = Number(req.query.max) || 1000;
  for (let i = 1; i <= max; i++) {
    if (isPrime(i)) primes.push(i);
  }
  res.json(primes);
});

export default app;