const crypto = require('crypto');

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
}

module.exports = Tools;
