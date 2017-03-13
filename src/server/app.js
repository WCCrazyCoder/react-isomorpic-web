const Express = require('express');
const path = require('path');

const compression = require('compression');
const favicon = require('serve-favicon');
const morgan = require('morgan');

const app = new Express();
// app.use(favicon(path.join(__dirname, 'assets', 'favicon.ico')));
app.use(Express.static(path.join(__dirname, '..', '..','static')));

app.use(compression());
app.use(morgan('tiny'));

export default app;
