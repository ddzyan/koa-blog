const dao = require('../../db/mysql/dao');

class ApiService {
  static async login(account, password) {
    password = global.tools.MD5Encryption(password);
    const accountRes = await dao.AdminDao.getAdmin(account, password);
    if (accountRes) {
      if (Object.is(accountRes.status, 1)) {
        return accountRes;
      }
      throw new global.errs.LoginException('账号已被禁用，请联系平台管理员');
    } else {
      throw new global.errs.LoginException('账号或密码错误');
    }
  }

  /**
   * 注册
   * @param {object} param 参数
   * @param {string} param.account 用户名
   * @param {string} param.password 密码
   * @param {string} param.nickname 昵称
   * @param {string} param.email 邮箱
   * @returns {Promise<boolean>} 操作结果
   */
  static async register({
    account, password, nickname, email,
  }) {
    const res = await dao.AdminDao.add({
      account, password, nickname, email,
    });
    if (!res) {
      throw new global.errs.RegisterException('用户名已经存在，请重新输入');
    }
    return res;
  }
}

module.exports = ApiService;
