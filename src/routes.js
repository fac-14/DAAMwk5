const handler = require("./handlers");

const router = (req, res) => {
  if (req.url == "/") {
    handler.home(req, res);
  } else {
    handler.publicHandler(req, res);
  }
};

module.exports = router;
