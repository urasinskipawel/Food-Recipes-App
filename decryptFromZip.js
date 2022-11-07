const { extract } = require('tar-fs');
const { createDecipher } = require('crypto');
const { createReadStream } = require('fs');
const { rmFolder } = require('./removeFolder');

const key = '123';

const decrypt = createDecipher('aes-256-ctr', key);

const decryptFolder = dishName => {
	createReadStream(`${__dirname}/${dishName}.tar`)
		.pipe(decrypt)
		.pipe(extract(`${dishName}`));
	rmFolder(dishName, '.tar', 10000);
};

module.exports = {
	decryptFolder,
};
