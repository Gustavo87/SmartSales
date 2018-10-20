package SmartSalesPlugins;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
//import org.apache.cordova.api.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;

//import com.phonegap.api.Plugin;

//import android.os.Environment;

public class LeerArchivoPlugin extends CordovaPlugin {

	@Override
	public boolean execute(String action, JSONArray arg1, CallbackContext CallbackContext) {
		//public PluginResult execute(String arg0, JSONArray arg1, String arg2) {
		//PluginResult pluginResult = null;
		String pathArchivo=null;
		String nombreArchivo=null;
		
		try {
			pathArchivo=arg1.getString(0);
			nombreArchivo=arg1.getString(1);
			
		} catch (JSONException e1) {
			
			//pluginResult = new PluginResult(PluginResult.Status.ERROR,e1.getMessage());
			CallbackContext.error(e1.getMessage());
			e1.printStackTrace();
		}	
		//Lee Archivo...
		StringBuilder text = new StringBuilder();
		try {
	     File file = new File(pathArchivo+nombreArchivo);
	     BufferedReader br = new BufferedReader(new FileReader(file));  
	     String line;   
	     while ((line = br.readLine()) != null) {
	                text.append(line);
	                text.append('\n');
	     }
	     br.close();
	     text.setLength(text.length() - 1);
	   //Regresa Archivo...
		 //pluginResult =new PluginResult(PluginResult.Status.OK,text.toString());
	     CallbackContext.success(text.toString());
		}catch (IOException e) {
			
			//pluginResult = new PluginResult(PluginResult.Status.ERROR,e.getMessage());
			CallbackContext.error(e.getMessage());
		    e.printStackTrace();           
		 }
		
		
		//return pluginResult;
		return true;
	}

}
