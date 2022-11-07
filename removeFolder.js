const { rm } = require('fs').promises;

const rmFolder = async (dishName, extension = '', delay = 5000) => {
	try {
		setTimeout(() => {
			rm(`${__dirname}/${dishName}${extension}`, { recursive: true });
		}, delay);
	} catch (err) {
		console.error('Unknown error', err);
	}
};

module.exports = {
	rmFolder,
};
