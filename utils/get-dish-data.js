/* eslint-disable no-await-in-loop */
const fetch = require('node-fetch');
const { writeFile } = require('fs').promises;
const { createWriteStream } = require('fs');

const getDishData = {
  getDishDescription: async (dataResult, dishName) => {
    const dishDescription = dataResult.description;
    if (
      !dishDescription ||
      dishDescription === '' ||
      dishDescription === null
    ) {
      console.log('There is no description data in this recipe');
    } else {
      await writeFile(`./${dishName}/Dish description.txt`, dishDescription, {
        flag: 'a',
      });
    }
  },

  getDishNutrients: async (dataResult, dishName) => {
    const dishNutrients = dataResult.nutrition;
    if (!dishNutrients || Object.keys(dishNutrients).length === 0) {
      console.log('There is no nutrition data in this recipe');
    } else {
      for (const [key, value] of Object.entries(dishNutrients)) {
        const nutrients = `${key}: ${value},\n`;
        await writeFile(
          `./${dishName}/Nutrition list.txt`,
          nutrients.split(`updated_at: ${value},\n`).pop(),
          {
            flag: 'a',
          }
        );
      }
    }
  },

  getDishInstructions: async (dataResult, dishName) => {
    const instructionsToMakeDish = dataResult.instructions;
    if (!instructionsToMakeDish || instructionsToMakeDish.length === 0) {
      console.log('There is no instructions data in this recipe');
    } else {
      let count = 1;
      for (const values of Object.values(instructionsToMakeDish)) {
        // eslint-disable-next-line no-plusplus
        const dishInstruction = `${count++}. ${values.display_text}\n`;
        await writeFile(`./${dishName}/Instructions.txt`, dishInstruction, {
          flag: 'a',
        });
      }
    }
  },

  getDishIngredients: async (dataResult, dishName) => {
    const dishIngredients = dataResult.sections;
    if (!dishIngredients || dishIngredients.length === 0) {
      console.log('There is no ingredients data in this recipe');
    } else {
      const ingredientsList = dishIngredients
        .map((el) => {
          const ingredient = el.components.map((item) => {
            const ingredientDecribe = `${item.raw_text}\n`;
            return ingredientDecribe;
          });
          return ingredient;
        })
        .flat();

      await writeFile(`./${dishName}/Ingredients list.txt`, ingredientsList, {
        flag: 'a',
      });
    }
  },

  getDishImage: async (dataResult, dishName) => {
    const dishImage = dataResult.thumbnail_url;
    if (!dishImage || dishImage === '' || dishImage === null) {
      console.log('There is no image to describe this dish ');
    } else {
      const resPicture = await fetch(dishImage);
      await resPicture.body.pipe(
        createWriteStream(`./${dishName}/Image of the dish.jpeg`)
      );
    }
  },
};

module.exports = { getDishData };
