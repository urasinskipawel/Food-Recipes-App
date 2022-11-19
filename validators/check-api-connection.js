const { consoleInterface } = require('../integration/console-interface');

const checkApiConnection = (apiData) => {
  if (apiData.count === 0) {
    console.error(
      'You have to type correct name of ingredient to show random dish'
    );
    consoleInterface.close();
  }
};
module.exports = {
  checkApiConnection,
};
