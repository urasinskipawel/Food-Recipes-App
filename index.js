const fetch = require('node-fetch');
const { mkdir, writeFile } = require('fs').promises;
const { createWriteStream } = require('fs');
const { normalize, join, resolve } = require('path');
const { encryptFolder } = require('./encryptToZip');
const { que } = require('./consoleInterface');

const checkUserData = (usersData, apiData) => {
	if (!usersData) {
		console.error('You have to type your ingredient in console to show random dish');
	} else if (apiData.count === 0) {
		console.error('You have to type correct name of ingredient to show random dish');
	} else {
		return;
	}
};

const makeSafeDirectoryPath = (base, target) => {
	const targetPath = '.' + normalize('/' + target);
	return resolve(base, targetPath);
};

const checkFileExist = async filePath => {
	const dishDirectory = normalize(join(makeSafeDirectoryPath(__dirname, filePath)));
	try {
		await mkdir(dishDirectory);
	} catch (err) {
		if (err.code === 'ENOENT') {
			console.log('File is not valid');
		} else {
			console.log('This directory already exists');
		}
	}
};

const getDishDescription = async (dataResult, dishName) => {
	const dishDescription = dataResult.description;
	if (!dishDescription || dishDescription === '' || dishDescription === null) {
		console.log('There is no description data in this recipe');
	} else {
		await writeFile(`./${dishName}/Dish description.txt`, dishDescription, { flag: 'a' });
	}
};

const getDishNutrients = async (dataResult, dishName) => {
	const dishNutrients = dataResult.nutrition;
	if (!dishNutrients || Object.keys(dishNutrients).length === 0) {
		console.log('There is no nutrition data in this recipe');
	} else {
		for (const [key, value] of Object.entries(dishNutrients)) {
			const nutrients = `${key}: ${value},\n`;
			await writeFile(`./${dishName}/Nutrition list.txt`, nutrients.split(`updated_at: ${value},\n`).pop(), { flag: 'a' });
		}
	}
};

const getDishInstructions = async (dataResult, dishName) => {
	const instructionsToMakeDish = dataResult.instructions;
	if (!instructionsToMakeDish || instructionsToMakeDish.length === 0) {
		console.log('There is no instructions data in this recipe');
	} else {
		let count = 1;
		for (const values of Object.values(instructionsToMakeDish)) {
			const dishInstruction = `${count++}. ${values.display_text}\n`;
			await writeFile(`./${dishName}/Instructions.txt`, dishInstruction, { flag: 'a' });
		}
	}
};

const getDishIngredients = async (dataResult, dishName) => {
	const dishIngredients = dataResult.sections;
	if (!dishIngredients || dishIngredients.length === 0) {
		console.log('There is no ingredients data in this recipe');
	} else {
		const ingredientsList = dishIngredients
			.map(el => {
				const ingredient = el.components.map(item => {
					const ingredientDecribe = `${item.raw_text}\n`;
					return ingredientDecribe;
				});
				return ingredient;
			})
			.flat();

		await writeFile(`./${dishName}/Ingredients list.txt`, ingredientsList, { flag: 'a' });
	}
};

const getDishImage = async (dataResult, dishName) => {
	const dishImage = dataResult.thumbnail_url;
	if (!dishImage || dishImage === '' || dishImage === null) {
		console.log('There is no image to describe this dish ');
	} else {
		const resPicture = await fetch(dishImage);
		await resPicture.body.pipe(createWriteStream(`./${dishName}/Image of the dish.jpeg`));
	}
};

(async () => {
	try {
		const usersData = process.argv[2];

		const apiUrl = `https://tasty.p.rapidapi.com/recipes/list?from=0&size=500&q=${usersData}`;

		const apiOptions = {
			method: 'GET',
			headers: {
				'X-RapidAPI-Key': 'fb74600af7msh728ebd26d531521p1a6225jsnb02121fe9dae',
				'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
			},
		};

		console.time('timer1');
		const res = await fetch(apiUrl, apiOptions);
		const data = await res.json();

		checkUserData(usersData, data);
		const randomDishNumber = Math.floor(Math.random() * data.results.length);
		const dataResult = data.results[randomDishNumber];
		// const dishData.name = dataResult.name;
		const dishData = {
			id: dataResult.id,
			name: dataResult.name,
			count: randomDishNumber,
		};

		console.log(dishData);

		checkFileExist(dishData.name);

		getDishDescription(dataResult, dishData.name);
		getDishIngredients(dataResult, dishData.name);
		getDishInstructions(dataResult, dishData.name);
		getDishImage(dataResult, dishData.name);
		getDishNutrients(dataResult, dishData.name);

		console.timeEnd('timer1');
		setTimeout(() => {
			encryptFolder(dishData.name);
		}, 3000);

		que(dishData.name, dishData.id);
	} catch {
		err => console.error('Error has occured:' + err);
	}
})();
