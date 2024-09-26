const { default: axios } = require('axios');
var express = require('express');
var app = module.exports = express()

const PORT = 3000;

app.get('/api/available-countries', async (req, res) => {
  try{
    const response = await axios.get('https://date.nager.at/api/v3/AvailableCountries');
    const countries = response.data;
    res.send({ countries });
  }catch(e){
    console.error("Error fetching countries : "+e);
    res.status(500).send('Could not fetch countries');
  }
});

app.get('/api/country-info/:countryCode', async (req, res) => {
  if (req.params.countryCode === 'US') {
    res.send({
      name: 'United States',
      code: 'US',
      continent: 'North America',
      population: 327000000,
      currency: 'USD'
    });
    return;
  }
  res.status(404).send('Country not found');
});

/* istanbul ignore next */
if (!module.parent) {
  app.listen(PORT);
  console.log('Express started on port 3000');
}