cordova.define("smartsales.bluetooth.BluetoothPlugin", function(require, exports, module) {
var exec = require('cordova/exec');

function BluetoothPlugin() {}

/*
BluetoothPlugin.prototype.showToast = function(aString){
 
 exec(function(result){
   },                   //exito...
  function(error){
   },                  //error...
   "BluetoothPlugin",  //clase java...
   aString,            //acción...
   []                  //argumentos...
   );
}
*/

BluetoothPlugin.prototype.isSupported = function() {
	return true;
};

BluetoothPlugin.prototype.enable = function(successCallback,failureCallback) {
	    exec(successCallback,
		failureCallback,
		'BluetoothPlugin',
		'enable',
		[]);
};

BluetoothPlugin.prototype.disable = function(successCallback,failureCallback) {
	    exec(successCallback,
		failureCallback,
		'BluetoothPlugin',
		'disable',
		[]);
};

BluetoothPlugin.prototype.discoverDevices = function(successCallback,failureCallback) {
	    exec(successCallback,
		failureCallback,
		'BluetoothPlugin',
		'discoverDevices',
		[]);
};

BluetoothPlugin.prototype.getUUIDs = function(successCallback,failureCallback,address) {
	    exec(successCallback,
		failureCallback,
		'BluetoothPlugin',
		'getUUIDs',
		[address]);
};

BluetoothPlugin.prototype.connect = function(successCallback,failureCallback,address,uuid) {
	     exec(successCallback,
		 failureCallback,
		 'BluetoothPlugin',
		 'connect',
		 [address, uuid]);
};

BluetoothPlugin.prototype.disconnect = function(successCallback,failureCallback,socketid) {
	    exec(successCallback,
		failureCallback,
		'BluetoothPlugin',
		'disconnect',
		[socketid]);
};

BluetoothPlugin.prototype.read = function(successCallback,failureCallback,socketid) {
	    exec(successCallback,
		failureCallback,
		'BluetoothPlugin',
		'read',
		[socketid]);
};

BluetoothPlugin.prototype.write = function(successCallback,failureCallback,socketid,jsonobject) {
		exec(successCallback,
		failureCallback,
		'BluetoothPlugin',
		'write', 
		[socketid,jsonobject]);
};
	
var BluetoothPlugin = new BluetoothPlugin();
module.exports = BluetoothPlugin;

});
