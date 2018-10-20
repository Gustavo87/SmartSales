
package com.example;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.content.Intent;
import android.os.SystemClock;
import android.provider.Settings;
import android.util.Log;
import com.bxl.config.editor.BXLConfigLoader;
import java.util.Set;
import jpos.JposException;
import jpos.POSPrinter;
import jpos.config.JposEntry;
import jpos.events.StatusUpdateEvent;
import jpos.events.StatusUpdateListener;

public class ImpresoraBixolon extends CordovaPlugin {

  private double tiempoImpresionSegundos;

  // Variables para gestionar la apertura y configuración de la conexión  con la impresora Bixolon SPP-R300
  private BXLConfigLoader bxlConfigLoader;
  private POSPrinter posPrinter;

  public void initialize(CordovaInterface cordova, CordovaWebView webView) {super.initialize(cordova, webView);}

  // Metodo principal
  public boolean execute(String action, JSONArray args, final CallbackContext callbackContext) throws JSONException {

    if(action.equals("imprimir")) {

      final String MAC   = args.getString(0);
      final String texto = args.getString(1);

      // No ejecutamos en el UI Thread la impresión, ya que es una tarea pesada.
      // la ejecutamos en un hilo secundario.
      cordova.getThreadPool().execute(new Runnable() {
        public void run() {

          // Configuramos la conexión a la impresora
          bxlConfigLoader = new BXLConfigLoader(webView.getContext());
          try {
            bxlConfigLoader.openFile();
          } catch (Exception e) {
            e.printStackTrace();
            bxlConfigLoader.newFile();
          }
          posPrinter = new  POSPrinter(webView.getContext());

          // Escuchamos los eventos que nos envía la impresora
          posPrinter.addStatusUpdateListener(new StatusUpdateListener() {
            @Override
            public void statusUpdateOccurred(StatusUpdateEvent statusUpdateEvent) {
              // Si por alguna razón la impresora se apaga, cerramos la conexión
              Log.i("Estado","Estado " + statusUpdateEvent.getStatus());
              if(statusUpdateEvent.getStatus() == 2004){
                try {
                  posPrinter.close();

                } catch (JposException e) {
                  e.printStackTrace();
                }
              }
            }
          });

//        Definimos la MAC en el archivo de configuración
          try {
            for (Object entry : bxlConfigLoader.getEntries()) {
              JposEntry jposEntry = (JposEntry) entry;
              bxlConfigLoader.removeEntry(jposEntry.getLogicalName());
            }
          } catch (Exception e) {
            e.printStackTrace();
          }

          try {

            bxlConfigLoader.addEntry(BXLConfigLoader.PRODUCT_NAME_SPP_R300,
                    BXLConfigLoader.DEVICE_CATEGORY_POS_PRINTER,
                    BXLConfigLoader.PRODUCT_NAME_SPP_R300,
                    BXLConfigLoader.DEVICE_BUS_BLUETOOTH, MAC);

            bxlConfigLoader.saveFile();
          } catch (Exception e) {
            e.printStackTrace();
          }

          try {

            // Abrimos la conexión a la impresora
            posPrinter.open(BXLConfigLoader.PRODUCT_NAME_SPP_R300);
            posPrinter.claim(0);
            posPrinter.setDeviceEnabled(true);

            // Calculamos el tiempo que delitará la impresión desde que inicia hasta que termina
            double caracteresxLinea = 64.0;
            double totalCaracteres = texto.length();
            double LineasxSegundo = 12.0;
            tiempoImpresionSegundos = 0.0;
            Long TimeoutImpresionMilisegundos= 5000L;
            Long tiempoEsperaMilisegundos = 0L;
            double numeroLineas = totalCaracteres/caracteresxLinea;
            tiempoImpresionSegundos = numeroLineas / LineasxSegundo;
            Long tiempoImpresiónMilisegundos = ((Long.valueOf(Math.round(Math.ceil(tiempoImpresionSegundos)))) * 1000);
            tiempoEsperaMilisegundos = tiempoImpresiónMilisegundos + TimeoutImpresionMilisegundos;
            Log.i("Tiempo","Tiempo " + tiempoEsperaMilisegundos);
            // Damos la orden de impresión
            posPrinter.printRawData(texto + "\n");



            // Esperamos hasta que la impresión termine
            SystemClock.sleep(tiempoEsperaMilisegundos);

            try {
              Log.i("Tiempo Imprimi","FIN");
              Log.i("Estado Final",posPrinter.getState()+"");
              // Si la conexión está abierta una vez transcurrido el tiempo de impresión, la impresión exitosa
			  if(posPrinter.getState() == 2 ){
                posPrinter.close();
                callbackContext.success("Impresión Exitosa");
              }
              else if(posPrinter.getState() == 1){
				// Si la conexión está cerrada una vez transcurrido el tiempo de impresión, la impresión fallo  
                callbackContext.error("Error, Se perdió la conexión, por favor vuelva a intentar");
              }
              else if(posPrinter.getState() == 4){
                posPrinter.close();
                callbackContext.error("Error, La impresora se quedó sin papel, por favor vuelva a intentar");
              }

            } catch (JposException e) {
              e.printStackTrace();
              callbackContext.error("Error, Se perdió la conexión");
            }

          } catch (JposException e) {
            // Si la conexión no se pudo abrir (en ese momento se está realizando otra impresión) , la impresión falla
			e.printStackTrace();
            callbackContext.error("Error, No se pudo abrir la conexión");

          }
        }
      });

    }
    if(action.equals("buscar")) {

      // Buscamos los dispositivos Bluetooth emparejados al dispositivo
      JSONArray lista = setBondedDevices();
      callbackContext.success(lista);

    }
    
    if(action.equals("configuracion")) {
      // Abrimos la pantalla del sistema que muestra los dispositivos emparejados
	  MostrarBluetoothSettings();
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

  public void MostrarBluetoothSettings(){

    Intent intent = new Intent(Settings.ACTION_BLUETOOTH_SETTINGS);
    cordova.getActivity().startActivityForResult(intent, 1);

  }

  @Override
  public void onDestroy() {
    super.onDestroy();
    try {
      posPrinter.close();
    } catch (JposException e) {
      e.printStackTrace();
    }
  }
}

