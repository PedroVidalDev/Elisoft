const http = require("http");
const app = require("./src/app.js");

const port = process.env.port || 3000;

const servidorHttp = http.createServer(app);

servidorHttp.listen(port, () => {console.log("Online.")});