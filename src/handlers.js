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
    response.writeHead(302, { 'Content-Type': 'text/plain' });
    response.end();

    // NEXT STEPS:
    // redirect user to home url,
    // send request (using lat and long) to police API,
    // get results from police
    // send object of some sorts to client
  },
  postcodeHandler(request, response) {
    const decoded = decodeURI(request.url);
    const postcode = decoded.split('postcode/')[1].replace(/[^A-Za-z0-9]/, '');

    // API request to get latitude and longitude from postcodes.io api
    requestPkg(`https://api.postcodes.io/postcodes/${postcode}`, (
      error,
      response,
      body,
    ) => {
      console.log(`error: ${error}`);
      const statusCode = response.statusCode;
      body = JSON.parse(body);
      console.log(
        `lat: ${body.result.latitude}, long: ${body.result.longitude}`,
      );
    });

    // PLACEHOLDER
    console.log(`postcode is ${postcode}`);
    response.writeHead(302, { 'Content-Type': 'text/plain' });
    response.end();

    // NEXT STEPS:
    // redirect user to home url,
    // send request (using lat and long) to police API,
    // get results from police
    // send object of some sorts to client
  },
};

module.exports = handler;
