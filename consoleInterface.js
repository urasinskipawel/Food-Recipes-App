const { createInterface } = require('readline');
const { decryptFolder } = require('./decryptFromZip');
const { rmFolder } = require('./removeFolder');

const rl = createInterface({
	input: process.stdin,
	output: process.stdout,
});

const que = async (dishName, dishId) => {
	await rl.question(`Type ID of ${dishName} to confirm your choise and unzip the file \n`, answer => {
		if (answer === String(dishId)) {
			decryptFolder(dishName);
			rmFolder(dishName, '.tar', 10000);
			console.log('You typed correct ID');
			rl.close();
			// decryptFolder();
		} else {
			console.log('Try again and take the best dish for you!');
			rl.close();
		}
	});
};

// rl.on('close', () => {
// 	process.exit(0);
// });

module.exports = {
	que,
};

// (async () => {
// 	try {
// 		const name = await prompt("What's your name: ");
// 		// Can use name for next question if needed
// 		const lastName = await prompt(`Hello ${name}, what's your last name?: `);
// 		// Can prompt multiple times
// 		console.log(name, lastName);
// 		rl.close();
// 	} catch (e) {
// 		console.error('Unable to prompt', e);
// 	}
// })();

// // When done reading prompt, exit program
// rl.on('close', () => process.exit(0));
