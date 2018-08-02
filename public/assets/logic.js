/*
* XHR
* Makes an asynchronous XMLHttpRequest
* Returns JSON parsed object
* Example usage: xhr("GET", "http://url.to.request/info/", function(data) { console.log(data) });
*/

function xhr(method, url, callback) {
  if (typeof callback === 'function') {
    const request = new XMLHttpRequest();
    request.open(method, url, true);
    request.onreadystatechange = () => {
      if (request.readyState === 4 && request.status === 200) {
        callback(JSON.parse(request.responseText));
      }
    };
    request.send(null);
  }
}

/*
* geoLocate
* Checks for geolocation support and returns a callback function if true
* Returns: callback(latitude, longitude)
*/
function geoLocate(callback) {
  if (typeof callback === 'function') {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        callback(position.coords.latitude, position.coords.longitude);
      });
    } else {
      console.log('geolocation is NOT available');
    }
  }
}
