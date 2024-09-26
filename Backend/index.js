const { default: axios } = require('axios');
var express = require('express');
var app = module.exports = express()

const PORT = 3030;

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

let countryCode = req.params.countryCode;
let countryData = {};
try{
  const response = await axios.get(`https://date.nager.at/api/v3/CountryInfo/${countryCode}`);
  countryData = response.data;  
}catch(e){
  console.error("Error fetching country data : "+e);
  res.status(500).send('Could not fetch country data');
  return;
}
countryData.populationData = await fetchPopulationData(countryData.commonName);
countryData.flagUrl = await fetchFlagUrl(countryCode);

res.send(countryData);

});

if (!module.parent) {
  app.listen(PORT);
  console.log('Express started on port '+PORT);
}

async function fetchPopulationData(countryName) {
  const response = await axios.get(`https://countriesnow.space/api/v0.1/countries/population`);
  const populationData = response.data.data;
  let population = populationData.find(data => data.country === countryName);
  if(!population){
    return null;
  }
  return population.populationCounts;

}

async function fetchFlagUrl(countryCode) {
  const response = await axios.get(`https://countriesnow.space/api/v0.1/countries/flag/images`);
  const flagData = response.data.data;
  let countryFlag = flagData.find(country => country.iso2 === countryCode);
  if(!countryFlag){
    return null;
  }
  return countryFlag.flag;
}