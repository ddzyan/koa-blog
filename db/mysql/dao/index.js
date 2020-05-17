const fs = require('fs');

const dao = {};
fs.readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== 'index.js'))
  .forEach((file) => {
    const fileName = file.slice(0, file.indexOf('.'));
    const Dao = require(`./${file}`);
    dao[fileName] = new Dao();
  });

module.exports = dao;
