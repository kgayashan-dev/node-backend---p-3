const http = require("http");

const hostname = "localhost";

const port = 8080;

const server = http.createServer((req, res) => {
  res.statusCode = 200;

  res.setHeader("Content-Type", "text/plain");

  res.end("Test Application!");// on browser
});

server.listen(port, hostname, () => {
  console.log(`Server runs at http://${hostname}:${port}/`);
});
