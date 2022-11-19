const { extract } = require('tar-fs');
const { createDecipher } = require('crypto');
const { createReadStream } = require('fs');
const { removeFolder } = require('./rm-folder');

const key = '123';

const decrypt = createDecipher('aes-256-ctr', key);

const decryptFolder = (dishName) => {
  createReadStream(`${dishName}.tar`)
    .pipe(decrypt)
    .pipe(extract(`${dishName}`));
  removeFolder(dishName, '.tar', 1000);
};

module.exports = {
  decryptFolder,
};
