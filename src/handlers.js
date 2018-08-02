const fs = require("fs");
const path = require("path");
const mime = require("mime-types");
const buildPath = function(myPath) {
  return path.join(__dirname, "..", "public", myPath);
};


const handler = {
  home: function(request, response) {
    console.log("running handle.home");
    fs.readFile(buildPath("index.html"), function(error, file) {
      if (error) {
        response.writeHead(500, { "Content-type": "text/plain" });
        response.end("server error");
        console.log(error);
        return;
      }
      response.writeHead(200, { "Content-Type": "text/html" });
      response.end(file);
    });
  },
  publicHandler: function(request, response) {
    fs.readFile(buildPath(request.url), function(error, file) {
      if (error) {
        response.writeHead(500, { "Content-type": "text/plain" });
        response.end("server error");
        console.log(error);
        return;
      }
      response.writeHead(200, {"Content-Type": mime.lookup(request.url)});
      response.end(file);
    });
  },
  coordsHandler: function(request, response) {
      // PLACEHOLDER
      const latlong = request.url.split("coords/")[1]
      const lat = latlong.split("&long=")[0].split("=")[1];)
      const long = latlong.split("&long=")[1];
      response.writeHead(302, {"Content-Type": "text/plain"});
      response.end();
  }
};

module.exports = handler;
