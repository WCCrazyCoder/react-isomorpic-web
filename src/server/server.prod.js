// Provide custom regenerator runtime and core-js
require('babel-polyfill');

const Express = require('express');
const path = require('path');

const port = process.env.PORT || 8000;
const app = require('./app.js');
const clientRoute = require('./middlewares/clientRoute');

app.use(clientRoute());
app.listen(port);
console.log(`\n 🌛 --- production --- Listening on port ${ port }. Open up http://localhost:${ port } in your browser. \n`);
