/*
  项目初始化配置
  1.数据库连接
  2. 路由加载
  3. 配置文件挂载
*/
const Router = require('koa-router');
const requireDirectory = require('require-directory');
const path = require('path');
const models = require('../db/mysql/models');

class InitManager {
  static beforeAppInit() {
    // 测试数据库连接
    InitManager.mysqlConnect();
  }

  static afterAppInit(app) {
    InitManager.app = app;
    InitManager.initLoadRouters();
    InitManager.loadHttpException();
    InitManager.loadConfig();
    InitManager.loadTools();
  }

  static async mysqlConnect() {
    try {
      await models.sequelize.authenticate();
      console.log('InitManager beforeAppInit mysql success');
    } catch (error) {
      console.error('InitManager beforeAppInit mysql error', error);
      throw error;
    }
  }

  // 加载全部路由
  static initLoadRouters() {
    // 判断 requireDirectory 加载的模块是否为路由
    function whenLoadModule(obj) {
      if (obj instanceof Router) {
        InitManager.app.use(obj.routes());
      }
    }

    const apiDirectory = path.join(__dirname, '../route/api');
    // 路由自动加载
    requireDirectory(module, apiDirectory, {
      visit: whenLoadModule,
    });
    console.log('InitManager afterAppInit initLoadRouters success');
  }

  // 加载配置文件
  static loadConfig(basePath = '') {
    const configPath = basePath || `${process.cwd()}/config/index.js`;
    const config = require(configPath);
    global.config = config;
    console.log('InitManager afterAppInit loadConfig success');
  }

  static loadHttpException() {
    const errors = require('../constant/error/Exception');
    global.errs = errors;
    console.log('InitManager afterAppInit loadHttpException success');
  }

  static loadTools() {
    const tools = require('./tools');
    global.tools = tools;
    console.log('InitManager afterAppInit loadTools success');
  }
}

module.exports = InitManager;
