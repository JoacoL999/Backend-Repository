"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("../index");
const index_2 = require("../index");
const compression_1 = __importDefault(require("compression"));
const data_1 = __importDefault(require("../data"));
const log4js_1 = __importDefault(require("log4js"));
const utils_1 = require("../utils");
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
const app = (0, express_1.default)();
app.get('/info/compressed', (0, compression_1.default)(), (req, res) => {
    res.send(data_1.default);
});
app.get('/info/normal', (req, res) => {
    res.send(data_1.default);
});
app.get('/', (req, res) => {
    infoLogger.info('Resolving / endpoint');
    res.json({
        pid: process.pid,
        msg: `HOLA desde puerto ${index_1.PORT}`,
    });
});
app.get('/api/randoms', (req, res) => {
    infoLogger.info('Resolving / endpoint');
    res.json({
        pid: process.pid,
        msg: `HOLA desde puerto ${index_1.PORT}`,
    });
});
app.get('/info', (req, res) => {
    res.json({
        CantidadProcesadores: index_2.numCPUs,
        msg: 'Funcionando'
    });
    data_1.default.forEach(data => {
        console.log(data._id);
        console.log(data.guid);
        console.log(data.balance);
        console.log(data.address);
        console.log(data.registered);
        console.log(data.greeting);
        console.log(data.favoriteFruit);
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
        if ((0, utils_1.isPrime)(i))
            primes.push(i);
    }
    res.json(primes);
});
exports.default = app;
