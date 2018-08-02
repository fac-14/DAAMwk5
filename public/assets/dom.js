const geoLoc = document.querySelector('.geoButton');
const postcodeLoc = document.querySelector('.postcodeButton');
const input = document.querySelector('#input_postcode');

geoLoc.addEventListener('click', (event) => {
  event.preventDefault();
  console.log('button works?');
  geoLocate((latitude, longitude) => {
    const locString = `/coords/?lat=${latitude}&long=${longitude}`;
    xhr('GET', locString, (geolocationData) => {
      // ADD GEOLOCATION DISPLAY CODE HERE :D
      console.log(geolocationData);
    });
  });
});

postcodeLoc.addEventListener('click', (event) => {
  event.preventDefault();
  console.log('Postcode Search Button Pressed!');
  const postcode = input.value;
  const postcodeString = `/postcode/${encodeURI(postcode.replace(' ', ''))}`;
  console.log(postcodeString);
  xhr('GET', postcodeString, (postcodeData) => {
    // ADD POSTCODE FORMATTING/DISPLAY CODE HERE :D
    console.log(postcodeData);
  });
});
