cordova.define("smartsales.leerArchivo.LeerArchivoPlugin", function(require, exports, module) {
var exec = require('cordova/exec');

function LeerArchivoPlugin() {}


LeerArchivoPlugin.prototype.leer = function(successCallback,failureCallback,path,archivo){
 exec(successCallback,
			failureCallback,
            'LeerArchivoPlugin', 
            'escribir', 
            [path,archivo]);
}

	
var LeerArchivoPlugin = new LeerArchivoPlugin();
module.exports = LeerArchivoPlugin;


});
