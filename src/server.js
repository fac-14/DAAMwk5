const http = require("http");
// const router = require("./routes")
const port = process.env.PORT || 4000;
const host = process.env.HOSTNAME || "localhost";

const server = http.createServer();

server.listen(port, host, () => {
    console.log(`server running on ${host} at ${port}`)
});

