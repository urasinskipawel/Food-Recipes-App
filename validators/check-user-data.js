const { consoleInterface } = require('../integration/console-interface');

const checkUserData = (usersData) => {
  if (!usersData) {
    console.error(
      'You have to type your ingredient in console to show random dish'
    );
    consoleInterface.close();
  }
};

module.exports = {
  checkUserData,
};
