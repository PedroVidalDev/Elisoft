const http = require("http");
const app = require("./src/app.js");

//const bonjour = require('bonjour')();

const port = process.env.port || 3000;

const servidorHttp = http.createServer(app);

servidorHttp.listen(port, () => {
    //bonjour.publish({ name: 'Elisoft App', type: 'http', port: port, host: "elisoftapp.local" });
    console.log("Online.")
});

