const { Admin } = require('../models');

class AdminDao {
  constructor() {
    this.model = Admin;
  }

  async getAdmin(account, password) {
    const res = await this.model.findOne({
      where: {
        account,
        password,
      },
      attributes: ['id', 'account', 'nickname', 'status'],
    });
    return res;
  }

  async add({
    account, password, nickname, email,
  }) {
    try {
      const res = await this.model.findOrCreate({
        where: {
          account,
        },
        defaults: {
          account,
          password,
          nickname,
          email,
        },
      });
      return res[1];
    } catch (error) {
      console.log(error);
      if (error.parent) {
        const {
          parent: { sqlMessage, sql, stack },
        } = error;
        throw new global.errs.SequelizeException({
          msg: sqlMessage,
          sql,
          stack,
        });
      } else {
        throw error;
      }
    }
  }
}

module.exports = AdminDao;
