cordova.define("cordova-plugin-impresora-bixolon-SPPR300_SPP-R310.plugin", function(require, exports, module) {

var exec = require('cordova/exec');

var PLUGIN_NAME = 'ImpresoraBixolonSPPR300ySPPR310';

var ImpresoraBixolonSPPR300ySPPR310 = {
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

module.exports = ImpresoraBixolonSPPR300ySPPR310;

});
