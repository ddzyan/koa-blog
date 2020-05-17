module.exports = {
  MAX_TIME: 1000,
  port: 3001,
  MY_TOKEN: 'abcdefg',
  sequelizeConfig: {
    dialect: 'mysql', // 数据库类型
    host: '127.0.0.1',
    port: 3306,
    database: 'boblog',
    username: 'root',
    password: '123456',
    logging: (sql, timing) => {
      // 每次日志输出都会调用的函数，可以在此进行重写
      if (typeof timing === 'number' && timing > 500) {
        // 记录执行时间超过阈值的sql
        console.warn(`[egg-sequelize](${timing} ms) ${sql}`);
      }
    },
    timezone: '+08:00', // 将日期从数据库转换为JavaScript日期时使用的时区。
    benchmark: true, // 将查询执行时间（以毫秒为单位）作为日志记录功能的第二个参数(options.logging)。
    define: {
      timestamps: false, // 是否创建updatedAt, createdAt列
      paranoid: false, //  删除时不删除数据，而更新deleteAt
      underscored: true, // 不使用驼峰法自动添加属性，而是用_
      freezeTableName: true, // 不是用复数表名
    },
    pool: { // 连接池属性
      max: 5, // 最大连接数
      min: 0, // 最小连接数
    },
    // operatorsAliases: false,
    // transactionType: '', // 设置默认事务类型
    // isolationLevel: '', // 设置事物隔离级别
  },
  redisConf: {
    host: '192.168.100.117',
    port: '6379',
    password: '123456',
    Db: 1,
  },
};
