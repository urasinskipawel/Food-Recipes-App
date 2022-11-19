const { rm } = require('fs').promises;

const removeFolder = async (dishName, extension = '', delay = 2500) => {
  try {
    setTimeout(() => {
      rm(`${dishName}${extension}`, { recursive: true });
    }, delay);
  } catch (err) {
    console.error(`Unknown error: ${err}`);
  }
};

module.exports = {
  removeFolder,
};
