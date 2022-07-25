import log4js from 'log4js';


log4js.configure({
    appenders: {
      error: { type: 'file', filename: 'logs/error.log' },
      info: { type: 'file', filename: 'logs/info.log' },
      warn: { type: 'file', filename: 'logs/warn.log' },
      debug: { type: 'file', filename: 'logs/debug.log'},
      consola: { type: 'console' },
    },
    categories: {
      
      default: { appenders: ['error', 'consola'], level: 'error' },
      warn: { appenders: ['warn', 'consola'], level: 'warn' },
      info: { appenders: ['info', 'consola'], level: 'info' },
      debug: { appenders: ['debug', 'consola'], level: 'debug'}
      
    },
  
  });
  
  export const errorLogger = log4js.getLogger('error')
  export const infoLogger = log4js.getLogger('info');
  export const warnLogger = log4js.getLogger('warn');
  export const debugLogger = log4js.getLogger('debug');