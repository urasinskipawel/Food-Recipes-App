const fetch = require('node-fetch');

const apiConnection = async (userData) => {
  const apiUrl = `https://tasty.p.rapidapi.com/recipes/list?from=0&size=500&q=${userData}`;

  const apiOptions = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.API_KEY,
      'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
    },
  };

  const apiResponse = await fetch(apiUrl, apiOptions);
  const apiData = await apiResponse.json();

  return apiData;
};

module.exports = {
  apiConnection,
};
