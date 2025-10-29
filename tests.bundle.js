// Este archivo carga todos los tests automáticamente
var context = require.context('./src', true, /\.spec\.jsx?$/);
context.keys().forEach(context);
module.exports = context;
