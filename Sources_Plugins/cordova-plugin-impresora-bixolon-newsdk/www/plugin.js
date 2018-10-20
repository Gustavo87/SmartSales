
var exec = require('cordova/exec');

var PLUGIN_NAME = 'ImpresoraBixolon';

var ImpresoraBixolon = {
  imprimir: function(MAC, texto, exito, error) {
    exec(exito, error, PLUGIN_NAME, 'imprimir', [MAC, texto]);
  },
  buscar: function(exito){
	  exec(exito, null, PLUGIN_NAME, 'buscar', []);
  },
  configuracion: function(){
	  exec(null, null, PLUGIN_NAME, 'configuracion', []);
  }
};

module.exports = ImpresoraBixolon;
