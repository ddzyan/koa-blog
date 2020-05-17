class HttpException extends Error {
  constructor(msg = '服务器异常', errorCode = 10000, code = 400) {
    super();
    this.errorCode = errorCode; // 子错误码
    this.code = code;// 返回status状态码
    this.msg = msg;// 错误信息
  }
}

module.exports = HttpException;
