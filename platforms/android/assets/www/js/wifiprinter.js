/*
 * PhoneGap is available under *either* the terms of the modified BSD license *or* the
 * MIT License (2008). See http://opensource.org/licenses/alphabetical for full text.
 * 
 * Copyright (c) 2005-2010, Nitobi Software Inc.
 * Copyright (c) 2010, IBM Corporation
 */

/**
 * Constructor
 */
function Wifiprinter() {
}

/**
 * Upload a file to a FTP server
 *
 * @param data             The file to be uploaded to the server
 * @param successCallback   The success callback
 * @param errorCallback     The error callback
 */
Wifiprinter.prototype.print = function(data, successCallback, errorCallback) {
     return PhoneGap.exec(successCallback, errorCallback, "WifiprinterPlugin", "print", [data]);
};

/**
 * Download a file from a FTP server
 *
 * @param file              The file to be uploaded to the server
 * @param url               The url of the ftp server
 * @param successCallback   The success callback
 * @param errorCallback     The error callback
 */
/*FtpClient.prototype.get = function(file, url, successCallback, errorCallback) {
     return PhoneGap.exec(successCallback, errorCallback, "FtpClient", "get", [file, url]);
};*/

/**
 * Load FtpClient
 */
PhoneGap.addConstructor(function() {
    PhoneGap.addPlugin("Wifiprinter", new Wifiprinter());
// @deprecated: No longer needed in PhoneGap 1.0. Uncomment the addService code for earlier 
// PhoneGap releases.
//     PluginManager.addService("WifiprinterPlugin", "com.phonegap.plugins.wifiprinterPlugin.WifiprinterPlugin");
});
