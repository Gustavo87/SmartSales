/**
 */
package com.example;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.PluginResult;
import org.apache.cordova.PluginResult.Status;
import org.json.JSONObject;
import org.json.JSONArray;
import org.json.JSONException;

import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import java.util.Set;

public class ImpresoraBixolonSPPR300ySPPR310 extends CordovaPlugin {
  private static final String TAG = "ImpresoraBixolonSPPR300ySPPR310";

  public void initialize(CordovaInterface cordova, CordovaWebView webView) {
    super.initialize(cordova, webView);

  }

  public boolean execute(String action, JSONArray args, final CallbackContext callbackContext) throws JSONException {
    if(action.equals("imprimir")) {
      String phrase = args.getString(0);
      final PluginResult result = new PluginResult(PluginResult.Status.OK,"Hola, Mundo!");
      callbackContext.sendPluginResult(result);
    }
    if(action.equals("buscar")) {
      // Buscamos los dispositivos Bluetooth emparejados al dispositivo
      JSONArray lista = setBondedDevices();
      callbackContext.success(lista);
    }
    return true;
  }

  private JSONArray setBondedDevices() {

    JSONArray array = new JSONArray();
    JSONObject item;
    BluetoothAdapter bluetoothAdapter = BluetoothAdapter
            .getDefaultAdapter();
    Set<BluetoothDevice> bondedDeviceSet = bluetoothAdapter
            .getBondedDevices();
    for (BluetoothDevice device : bondedDeviceSet) {
      if( device.getName().equals("SPP-R300") || device.getName().equals("APEX3") ){
        item = new JSONObject();
        try {
          item.put("Nombre",device.getName());
          item.put("MAC",device.getAddress());
          array.put(item);
        } catch (JSONException e) {
          e.printStackTrace();
        }
      }
    }
    return array;
  }

}
