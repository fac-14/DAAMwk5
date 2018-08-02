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
  }
};

module.exports = handler;
