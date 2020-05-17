const moment = require('moment');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const admin = sequelize.define(
    'Admin',
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        comment: '主键',
      },
      nickname: {
        type: DataTypes.STRING(64),
        allowNull: false,
        comment: '管理员昵称',
      },
      email: {
        type: DataTypes.STRING(128),
        allowNull: false,
        comment: '管理员邮箱',
      },
      account: {
        type: DataTypes.STRING(20),
        allowNull: false,
        comment: '管理员账号',
      },
      password: {
        type: DataTypes.STRING(12),
        allowNull: false,
        comment: '密码',
        set(val) {
          // 加密
          const psw = global.tools.MD5Encryption(val);
          this.setDataValue('password', psw);
        },
      },
      status: {
        type: DataTypes.INTEGER(1),
        defaultValue: 1,
        comment: '1启用0关闭',
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
        get() {
          return moment(this.getDataValue('createdAt'))
            .utc()
            .utcOffset(480)
            .format('YYYY-MM-DD HH:mm:ss');
        },
        comment: '创建时间',
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
        get() {
          return moment(this.getDataValue('updatedAt'))
            .utc()
            .utcOffset(480)
            .format('YYYY-MM-DD HH:mm:ss');
        },
        comment: '创建时间',
      },
    },
  );

  // admin.associate = (models) => {};

  return admin;
};
