const fs = require('fs');
const path = require('path');
const mime = require('mime-types');
const requestPkg = require('request');

const buildPath = function (myPath) {
  return path.join(__dirname, '..', 'public', myPath);
};

const handler = {
  home(request, response) {
    console.log('running handle.home');
    fs.readFile(buildPath('index.html'), (error, file) => {
      if (error) {
        response.writeHead(500, { 'Content-type': 'text/plain' });
        response.end('server error');
        console.log(error);
        return;
      }
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end(file);
    });
  },
  publicHandler(request, response) {
    fs.readFile(buildPath(request.url), (error, file) => {
      if (error) {
        response.writeHead(500, { 'Content-type': 'text/plain' });
        response.end('server error');
        console.log(error);
        return;
      }
      response.writeHead(200, { 'Content-Type': mime.lookup(request.url) });
      response.end(file);
    });
  },
  coordsHandler(request, response) {
    const latlong = request.url.split('coords/')[1];
    const lat = latlong.split('&long=')[0].split('=')[1];
    const long = latlong.split('&long=')[1];
    console.log(`lat ${lat} long ${long}`);
    const url = `https://data.police.uk/api/crimes-street/all-crime?lat=${lat}&lng=${long}`;
    requestPkg(url, (error, res, body) => {
      const crimes = handler.responseCreator(body);
      const crimesParsed = JSON.stringify(crimes);
      response.writeHead(res.statusCode, { 'Content-Type': 'application/JSON' });
      response.end(crimesParsed);
    });
  },
  postcodeHandler(request, response) {
    console.log('Running Postcode!');
    const decoded = decodeURI(request.url);
    const postcode = decoded.split('postcode/')[1].replace(/[^A-Za-z0-9]/, '');
    requestPkg(`https://api.postcodes.io/postcodes/${postcode}`, (error, res, body) => {
      body = JSON.parse(body);
      const lat = body.result.latitude;
      const long = body.result.longitude;
      const url = `https://data.police.uk/api/crimes-street/all-crime?lat=${lat}&lng=${long}`;
      requestPkg(url, (error, res, body) => {
        console.log('Postcode Recieved!');
        const crimes = handler.responseCreator(body);
        const crimesParsed = JSON.stringify(crimes);
        response.writeHead(res.statusCode, { 'Content-Type': 'application/JSON' });
        response.end(crimesParsed);
      });
    });
  },
  crimeLookup(response, request, error, res, body) {

  },
  responseCreator(testArr) {
    const parseArr = JSON.parse(testArr);
    // Object to send back to client
    const responseObj = {
      crimes: {},
      streets: {},
    };

    // Extract crimes and streets from the large JSON response. Make street descriptions more concise with regex
    const listOfCrimes = parseArr.map(i => i.category);
    const listOfStreets = parseArr.map(i => i.location.street.name.replace('On or near ', ''));

    // Use callback to filter unique values from array
    function getUniqueValues(val, i, self) {
      return self.indexOf(val) === i;
    }

    const uniqueCrimes = listOfCrimes.filter(getUniqueValues);
    const uniqueStreets = listOfStreets.filter(getUniqueValues);

    // Initialise values in object (to avoid NaN issue)
    uniqueCrimes.forEach(i => (responseObj.crimes[i] = 0));
    uniqueStreets.forEach(i => (responseObj.streets[i] = 0));

    // Increase count (value) of each crime (key) by one each time it appears in the array
    listOfCrimes.forEach(i => (responseObj.crimes[i] += 1));
    listOfStreets.forEach(i => (responseObj.streets[i] += 1));

    return responseObj;
  },
};

module.exports = handler;
