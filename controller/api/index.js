const ApiService = require('../../service/api');

class ApiController {
  // 路由间的参数传递可以使用ctx.state属性
  static async login(ctx) {
    const { account, password } = ctx.request.body;
    const res = await ApiService.login(account, password);
    ctx.body = res;
  }

  static async register(ctx) {
    const {
      account, password, nickname, email,
    } = ctx.request.body;
    const res = await ApiService.register({
      account, password, nickname, email,
    });
    ctx.body = res;
  }
}

module.exports = ApiController;
