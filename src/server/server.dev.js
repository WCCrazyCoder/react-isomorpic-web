// Provide custom regenerator runtime and core-js
require('babel-polyfill');

// Javascript require hook
// require('../../server.babel');

// Css require hook
// require('css-modules-require-hook')({
//     extensions: ['.scss'],
//     preprocessCss: (data, filename) =>
//         require('node-sass').renderSync({
//             data,
//             file: filename
//         }).css,
//     camelCase: true,
//     generateScopedName: '[name]__[local]__[hash:base64:8]'
// })

// // Image require hook
// require('asset-require-hook')({
//     name: '/[hash].[ext]',
//     extensions: ['jpg', 'png', 'gif', 'webp'],
//     limit: 8000
// });

const port = process.env.PORT || 8000;
const app = require('./app.js');
const clientRoute = require('./middlewares/clientRoute');

app.use(clientRoute());
app.listen(port);
console.info(`\n 🌛 --- development --- Listening on port ${ port }. Open up http://localhost:${ port } in your browser. \n`);
