const crypto = require('crypto');
const jwt = require('jwt-simple');

const { TOKEN } = require('../config');

class Tools {
  static sleep(time) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, time * 1000);
    });
  }

  static MD5Encryption(data) {
    const encryption = crypto.createHash('md5');
    const encryptionted = encryption.update(data).digest('hex');
    return encryptionted;
  }

  // 生成TOKEN
  static generatorToken(param) {
    const payload = {
      exp: Date.now() + TOKEN.tokenExpiresTime,
      ...param,
    };
    return jwt.encode(payload, TOKEN.jwtSecret);
  }
}

module.exports = Tools;
