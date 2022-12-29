const { createInterface } = require('readline');
const { basename } = require('path');
const { decryptFolder } = require('../utils/decrypt-from-zip');
const { removeFolder } = require('../utils/rm-folder');

const consoleInterface = createInterface({
	input: process.stdin,
	output: process.stdout,
});

const questionToUser = (dishName, dishId) => {
	consoleInterface.question(
		`Type ID of ${basename(
			dishName
		)} to confirm your choise and unzip the file or skip it by press any keyboard key  \n`,
		answer => {
			if (answer === String(dishId)) {
				decryptFolder(dishName);
				console.log('You typed correct ID');
				consoleInterface.close();
			} else {
				removeFolder(dishName, '.tar', 1000);
				console.log('Try again and take the best dish for you!');
				consoleInterface.close();
			}
		}
	);
};

module.exports = {
	questionToUser,
	consoleInterface,
};
