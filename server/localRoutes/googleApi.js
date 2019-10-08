const fetch = require('node-fetch');
const express = require('express');

const apiEndpointA = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=';
const apiEndpointB = '&inputtype=textquery&fields=formatted_address,name&key=';
const apiKey = 'your_API_key_here';

const router = express.Router();

router.get('/:prediction', async (req, res) => {
  const prediction = await fetch(apiEndpointA + req.params.prediction + apiEndpointB + apiKey)
    .then(response => response.json())
    .then(data => data)
    .catch(Promise.reject);

  res.send(prediction);
});

module.exports = router;
