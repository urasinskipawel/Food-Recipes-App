const fetch = require('node-fetch');

const apiConnection = async (userData) => {
  const apiUrl = `https://tasty.p.rapidapi.com/recipes/list?from=0&size=500&q=${userData}`;

  const apiOptions = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'fb74600af7msh728ebd26d531521p1a6225jsnb02121fe9dae',
      'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
    },
  };

  const apiResponse = await fetch(apiUrl, apiOptions);
  const apiData = await apiResponse.json();
  // console.log(apiData);

  return apiData;
};

module.exports = {
  apiConnection,
};
