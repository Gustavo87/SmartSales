cordova.define("smartsales.ftp.FTPPlugin", function(require, exports, module) {
var exec = require('cordova/exec');
function FTPPlugin() {}

FTPPlugin.prototype.put = function(file, url, successCallback, errorCallback) {
     exec(successCallback,
      errorCallback,
       "FTPPlugin",
       "put",
        [file, url]);
};

var FTPPlugin = new FTPPlugin();
module.exports = FTPPlugin;
});
