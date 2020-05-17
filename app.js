const Koa = require('koa');
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const http = require('http');
const cluster = require('cluster');

const { port, MAX_TIME } = require('./config');
const catchError = require('./middlewares/exception');
const InitManager = require('./lib/init');

const app = new Koa();

// 初始化连接
InitManager.beforeAppInit();

// error handler
onerror(app);

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text'],
}));
app.use(json());
app.use(logger());
app.use(require('koa-static')(`${__dirname}/public`));

app.use(views(`${__dirname}/views`, {
  extension: 'pug',
}));

app.use(catchError);

InitManager.afterAppInit(app);

const server = http.createServer(app.callback());

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  console.log(`Listening on ${bind}`);
}

server.listen(port);

server.on('error', onError);

server.on('listening', onListening);

const unhandledRejection = new Map();
/**
 * 未被 catch 捕获的 promise 异常
 * reason为错误信息,promise为未被捕获的异常对象
 * 在设定的最大事件内未被处理，则记录并且移出 unhandledRejection
 */
process.on('unhandledRejection', (reason, promise) => {
  unhandledRejection.set(promise, reason);

  setTimeout(() => {
    unhandledRejection.delete(promise);
    console.log('unhandledRejection :', reason);
  }, MAX_TIME);
});

process.on('rejectionHandled', (promise) => {
  if (unhandledRejection.has(promise)) {
    unhandledRejection.delete(promise);
    console.log('移除未被捕获的promise map');
  }
});

/**
 * 未被try catch 捕获的异常,例如异步
 */
process.on('uncaughtException', (error) => {
  /**
   * 1.记录异常
   * 2.关闭服务
   * 3.关闭进程
   * 4.如果未多线程部署，则通知主线程断开
   */

  console.log('uncaughtException :', error);
  try {
    const killTime = setTimeout(() => {
      process.exit(1);
    }, 10 * 1000);
    server.close((err) => {
      if (err) {
        throw err;
      } else {
        killTime.unref();
      }
    });
    if (cluster.worker) {
      cluster.worker.disconnect();
    }
  } catch (err) {
    console.log(error);
  }
});


module.exports = server;
