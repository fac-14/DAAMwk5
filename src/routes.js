const handler = require("./handlers");

const router = (req, res) => {
  if (req.url == "/") {
    handler.home(req, res);
  } else if (req.url.includes('assets')) {
    handler.publicHandler(req, res);
  } else {
    // handler.publicHandler(req, res);
    res.writeHead(404, "Content-Type: text/html")
    res.end("<h1> Oops. You're at a 404 </h1>")
  }
};

module.exports = router;
