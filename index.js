require('dotenv').config({ path: '.env' });

const { join } = require('path');
const { apiConnection } = require('./config/api-config');
const { questionToUser } = require('./integration/console-interface');
const { encryptFolder } = require('./utils/encrypt-to-zip');
const { checkFileExist } = require('./validators/check-file-exist');
const { checkUserData } = require('./validators/check-user-data');
const { checkApiConnection } = require('./validators/check-api-connection');
const { getDishData } = require('./utils/get-dish-data');

(async () => {
  try {
    const userData = process.argv[2];
    checkUserData(userData);

    const apiData = await apiConnection(userData);
    checkApiConnection(apiData);

    const randomDishNumber = Math.floor(Math.random() * apiData.results.length);
    const apiDataResult = apiData.results[randomDishNumber];
    const dishData = {
      id: apiDataResult.id,
      name: apiDataResult.name,
    };

    console.log(`The ID of the drawn dish is: ${dishData.id}`);

    const dishDirectory = join('./Random Recipes/', dishData.name);
    checkFileExist(dishDirectory);

    getDishData.getDishIngredients(apiDataResult, dishDirectory);
    getDishData.getDishInstructions(apiDataResult, dishDirectory);
    getDishData.getDishImage(apiDataResult, dishDirectory);
    getDishData.getDishNutrients(apiDataResult, dishDirectory);

    setTimeout(() => {
      encryptFolder(dishDirectory);
    }, 1000);

    questionToUser(dishDirectory, dishData.id);
  } catch (err) {
    console.error(`Error has occured: ${err}`);
  }
})();
