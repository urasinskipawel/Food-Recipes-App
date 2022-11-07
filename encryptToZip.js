const { pack } = require('tar-fs');
const { createCipher } = require('crypto');
const { createWriteStream, createReadStream } = require('fs');
const { rmFolder } = require('./removeFolder');

const key = '123';

const encrypt = createCipher('aes-256-ctr', key);

const encryptFolder = dishName => {
	const pathRecipe = `${__dirname}/${dishName}`;
	createReadStream(pathRecipe);
	pack(pathRecipe)
		.pipe(encrypt)
		.pipe(createWriteStream(`${__dirname}/${dishName}.tar`));
	rmFolder(dishName);
};

module.exports = {
	encryptFolder,
};
