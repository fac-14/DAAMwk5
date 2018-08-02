const fs = require('fs');
const path = require('path');
const mime = require('mime-types');
const buildPath = function(myPath){
    return path.join(__dirname, "..", 'public', myPath);
}


function mimeGenerator(request, response, url){
  const lookup = mime.lookup(url)
};


const handler = {
    home: function (request, response){
        console.log("running handle.home");
        fs.readFile(buildPath("index.html"), function(error,file){
            if (error){
                response.write(500, {"Content-type":"text/plain"});
                response.end('server error');
                console.log(error);
                return;
            }
            response.writeHead(200, {"Content-Type": "text/html"});
            response.end(file);
        });
    }
}



module.exports = handler;
