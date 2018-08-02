const http = require("http");
const router = require("./routes")
const port = process.env.PORT || 4000;
const host = process.env.HOSTNAME || "localhost";

// wrapped in IIFE
const server = http.createServer(router);

server.listen(port, host, () => {
    console.log(`server running on ${host} at ${port}`)
});

// run server with "node ./src/server.js"