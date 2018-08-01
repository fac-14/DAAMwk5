/*
* XHR
* Makes an asynchronous XMLHttpRequest
* Returns JSON parsed object
* Example usage: xhr("GET", "http://url.to.request/info/", function(data) { console.log(data) });
*/

function xhr(method, url, callback) {
  console.log('Testing API CALL');
  const request = new XMLHttpRequest();
  request.open(method, url, true);
  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      callback(JSON.parse(request.responseText));
    }
  };
  request.send(null);
}
