const geoLoc = document.querySelector('.geoButton');
const postcodeLoc = document.querySelector('.postcodeButton');
const input = document.querySelector('#input_postcode');
const display = document.querySelector('#display');

function clearList(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function incidentReport(testObj) {
  clearList(display);
  const p = document.createElement('p');
  const totalCount = Object.values(testObj.crimes).reduce((a, b) => a + b);
  p.textContent = `🚨👮 Oh no! There have been ${totalCount} crimes in that location! 👮🚨`;
  display.appendChild(p);
  const ul = document.createElement('ul');
  const streetNames = Object.keys(testObj.streets);
  streetNames.map((street) => {
    const li = document.createElement('li');
    li.textContent += `${street}: ${testObj.streets[street]} incidents`;
    ul.appendChild(li);
  });
  display.appendChild(ul);
}

const testObj = {
  crimes: {
    burglary: 300,
    arson: 45,
    'robbery crime': 33,
    theft: 10,
    theft: 54,
  },
  streets: {
    'bad street 1': 220,
    'Fonthill Road': 102,
    'good street 12': 5,
  },
};

geoLoc.addEventListener('click', (event) => {
  event.preventDefault();
  console.log('button works?');
  geoLocate((latitude, longitude) => {
    const locString = `/coords/?lat=${latitude}&long=${longitude}`;
    xhr('GET', locString, (geolocationData) => {
      console.log(geolocationData);
    });
    // TODO - put back in XHR for when it works
    incidentReport(testObj);
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
  incidentReport(testObj);
});
