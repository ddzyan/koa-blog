const HttpException = require('../constant/error/HttpException');

const catchError = async (ctx, next) => {
  try {
    await next();
    const { body } = ctx;
    ctx.body = {
      data: body,
      error_code: 0,
      msg: '',
      request: `${ctx.method} ${ctx.path}`,
    };
  } catch (error) {
    console.error(error);
    // 开发环境
    const isHttpException = error instanceof HttpException;
    const isDev = process.env.NODE_ENV || 'dev';

    if (isDev && !isHttpException) {
      throw error;
    }

    // 生成环境
    if (isHttpException) {
      ctx.body = {
        data: {},
        msg: error.msg,
        error_code: error.errorCode,
        request: `${ctx.method} ${ctx.path}`,
      };
      // ctx.response.status = error.code;
    } else {
      ctx.body = {
        data: {},
        msg: '未知错误！',
        error_code: 9999,
        request: `${ctx.method} ${ctx.path}`,
      };
      ctx.response.status = 500;
    }
  }
};

module.exports = catchError;
