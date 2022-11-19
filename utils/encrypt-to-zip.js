const { pack } = require('tar-fs');
const { createCipher } = require('crypto');
const { createWriteStream, createReadStream } = require('fs');
const { removeFolder } = require('./rm-folder');

const key = '123';

const encrypt = createCipher('aes-256-ctr', key);

const encryptFolder = (dishName) => {
  const pathRecipe = `${dishName}`;
  createReadStream(pathRecipe);
  pack(pathRecipe)
    .pipe(encrypt)
    .pipe(createWriteStream(`${dishName}.tar`));
  removeFolder(dishName);
};

// encryptFolder('./Random Recipes/Back-To-School Snack Board');

module.exports = {
  encryptFolder,
};
