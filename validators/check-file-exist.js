const { normalize, join, resolve } = require('path');
const { mkdir } = require('fs').promises;
const { consoleInterface } = require('../integration/console-interface');

const makeSafeDirectoryPath = (base, target) => {
  const targetPath = `.${normalize(`/${target}`)}`;
  return resolve(base, targetPath);
};

const checkFileExist = async (filePath) => {
  const dishDirectory = normalize(join(makeSafeDirectoryPath(`./`, filePath)));
  try {
    await mkdir(dishDirectory);
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.error('File is not valid');
      consoleInterface.close();
    } else {
      console.error('This directory already exists');
      consoleInterface.close();
    }
  }
};

module.exports = {
  checkFileExist,
};
