const fetch = require('node-fetch');
const { mkdir, writeFile, stat } = require('fs').promises;
const { createReadStream, createWriteStream } = require('fs');
const { pipeline } = require('stream').promises;

const usersData = process.argv[2];
const apiUrl = `https://tasty.p.rapidapi.com/recipes/list?from=0&size=500&q=${usersData}`;
const apiOptions = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'da5cf488f0mshbefeff9d826ed96p1e1d50jsnfe59405099d4',
		'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
	},
};

const checkUserData = () => {
	if (!usersData) {
		console.error('You have to type your ingredient in console');
	} else {
		console.log(usersData);
	}
};

const checkFileExist = async filePath => {
	try {
		await stat(filePath);
	} catch (err) {
		if (err.code === 'ENOENT') {
			await mkdir(`./${filePath}`, {
				recursive: true,
			});
		} else {
			console.log('This directory already exists');
		}
	}
};

//////// TODO - zrobic funkcje na poszczegolne dane / sprobowac pipeline z video i image/  zaszyfrowac id - jezeli sie zgadza to mozna odczytac folder

//Fetch name
(async () => {
	try {
		checkUserData();
		const res = await fetch(apiUrl, apiOptions);
		const data = await res.json();
		const randomDishNumber = Math.floor(Math.random() * data.results.length);
		const dataResult = data.results[randomDishNumber];

		const dishName = dataResult.name;
		console.log({ id: data.results[randomDishNumber].id, name: dishName, count: randomDishNumber });

		await mkdir(`./${dishName}`);

		const dishDescription = dataResult.description;

		if (dishDescription === '' || dishDescription === null || !dishDescription) {
			console.log('There is no description data in this recipe');
		} else {
			await writeFile(`./${dishName}/Dish description.txt`, dishDescription, { flag: 'a' });
			console.log('Description done');
		}

		const dishNutrients = dataResult.nutrition;
		if (Object.keys(dishNutrients).length === 0 || !dishNutrients) {
			console.log('There is no nutrition data in this recipe');
		} else {
			for (const [key, value] of Object.entries(dishNutrients)) {
				const nutrients = `${key}: ${value},\n`;
				await writeFile(`./${dishName}/Nutrition list.txt`, nutrients.split(`updated_at: ${value},\n`).pop(), { flag: 'a' });
				// console.log('Nutr done');
			}
		}

		const instructionsToMakeDish = dataResult.instructions;
		if (instructionsToMakeDish.length === 0 || !instructionsToMakeDish) {
			console.log('There is no instructions data in this recipe');
		} else {
			let count = 1;
			for (const values of Object.values(instructionsToMakeDish)) {
				const dishInstruction = `${count++}. ${values.display_text}\n`;
				await writeFile(`./${dishName}/Instructions.txt`, dishInstruction, { flag: 'a' });
				console.log('Instruction done');
			}
		}

		const dishIngredients = dataResult.sections;

		if (dishIngredients.length === 0 || !dishIngredients) {
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

		// console.log('Done!');
		const dishImage = dataResult.thumbnail_url;
		if (dishImage === '' || dishImage === null || !dishImage) {
			console.log('There is no image to describe this dish ');
		} else {
			const resPicture = await fetch(dishImage);

			resPicture.body.pipe(createWriteStream(`./${dishName}/Image of the dish.jpeg`));
		}

		// Pobranie video

		// const video = dataResult.original_video_url;
		// const resVideo = await fetch(video);
		// resVideo.body.pipe(createWriteStream(`./${dishName}/Video.mp4`));
	} catch {
		err => console.error('Error has occured:' + err);
	}
})();
