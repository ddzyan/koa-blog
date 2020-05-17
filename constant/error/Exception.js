const HttpException = require('./HttpException');

const ERROR_CODE = {
  LOGIN_ERROR: 100,
  SEQUELIZE_ERROR: 101,
  REGISTER_ERROR: 102,
};

class LoginException extends HttpException {
  constructor(msg) {
    super();
    this.msg = msg;
    this.errorCode = ERROR_CODE.LOGIN_ERROR;
  }
}

class RegisterException extends HttpException {
  constructor(msg) {
    super();
    this.msg = msg;
    this.errorCode = ERROR_CODE.REGISTER_ERROR;
  }
}

class SequelizeException extends HttpException {
  constructor({
    msg, sql, stack,
  }) {
    super();
    this.msg = msg;
    this.sql = sql;
    this.stack = stack;
    this.errorCode = ERROR_CODE.SEQUELIZE_ERROR;
  }
}

module.exports = {
  LoginException,
  SequelizeException,
  RegisterException,
};
