const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const { sequelizeConfig } = require('../../../config');

const db = {};

// 初始化连接
const sequelize = new Sequelize(
  sequelizeConfig.database, // 数据库名称
  sequelizeConfig.username, // 用户名
  sequelizeConfig.password, // 用户密码
  {
    dialect: sequelizeConfig.dialect, // 数据库使用mysql
    host: sequelizeConfig.host, // 数据库IP地址
    port: sequelizeConfig.port, // 数据库服务器使用端口
    timezone: sequelizeConfig.timezone,
    logging: sequelizeConfig.logging,
    pool: sequelizeConfig.pool,
    define: sequelizeConfig.define,
    operatorsAliases: sequelizeConfig.operatorsAliases,
  },
);

// 读取表模型，实例化并且导入
fs.readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== 'index.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

module.exports = Object.assign(db, { sequelize, Sequelize });
