package com.example;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.PluginResult;
import org.json.JSONObject;
import org.json.JSONArray;
import org.json.JSONException;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.os.Handler;
import android.util.Log;

import java.util.Set;

import com.bxl.BXLConst;
import com.bxl.config.editor.BXLConfigLoader;
import jpos.JposConst;
import jpos.JposException;
import jpos.POSPrinter;
import jpos.POSPrinterConst;
import jpos.config.JposEntry;
import jpos.events.ErrorEvent;
import jpos.events.ErrorListener;
import jpos.events.StatusUpdateEvent;
import jpos.events.StatusUpdateListener;

public class ImpresoraBixolonSPPR300ySPPR310 extends CordovaPlugin
        {

 public class EstadoImpresion {
   Boolean huboError;
   String  mensaje;

   public EstadoImpresion() {
   }

   public Boolean getHuboError() {
     return huboError;
   }

   public void setHuboError(Boolean huboError) {
     this.huboError = huboError;
   }

   public String getMensaje() {
     return mensaje;
   }

   public void setMensaje(String mensaje) {
     this.mensaje = mensaje;
   }
 }

 private static final String TAG = "ImpresoraBixolonSPPR300ySPPR310";

  private BXLConfigLoader bxlConfigLoader;
  private POSPrinter posPrinter;
  private PluginResult result;

  private EstadoImpresion estadoImpresion = new EstadoImpresion();

  public void initialize(CordovaInterface cordova, CordovaWebView webView) {
    super.initialize(cordova, webView);

  }

  public boolean execute(String action, JSONArray args, final CallbackContext callbackContext) throws JSONException {
    if(action.equals("imprimir")) {

      estadoImpresion.setHuboError(false);
      estadoImpresion.setMensaje("El documento se imprimio correctamente");

      final String MAC   = args.getString(0);
      final String Nombre = args.getString(2);
      final String texto = args.getString(1);

      bxlConfigLoader = new BXLConfigLoader(webView.getContext());
      try {
        bxlConfigLoader.openFile();
      } catch (Exception e) {
        e.printStackTrace();
        bxlConfigLoader.newFile();
      }


      posPrinter = new POSPrinter(webView.getContext());

      posPrinter.addErrorListener(new ErrorListener() {

        @Override
        public void errorOccurred(ErrorEvent errorEvent) {
          Log.i("EstadoImpresion " + getERMessage(errorEvent.getErrorCodeExtended()), "EstadoImpresion ");

          if(getERMessage(errorEvent.getErrorCodeExtended()).equals("Power off")){
            try
            {
              posPrinter.close();
            }
            catch(JposException e)
            {
              e.printStackTrace();
            }
            // port-close
          }else if(getERMessage(errorEvent.getErrorCodeExtended()).equals("Cover open")){

          }else if(getERMessage(errorEvent.getErrorCodeExtended()).equals("Paper empty")){
          }
        }
      });
      posPrinter.addStatusUpdateListener(new StatusUpdateListener() {

        @Override
        public void statusUpdateOccurred(StatusUpdateEvent arg0) {
          Log.i("Estado " + arg0.getStatus(),"Estado " + arg0.getStatus() + " " + getSUEMessage(arg0.getStatus()) );
          if(getSUEMessage(arg0.getStatus()).equals("Power off")){
            estadoImpresion.setHuboError(true);
            estadoImpresion.setMensaje("Error, se ha perdido la conexión con la impresora. Favor revise la impresora y vuelva a intentar.");
          }else if(getSUEMessage(arg0.getStatus()).equals("Cover Open")){
            estadoImpresion.setHuboError(true);
            estadoImpresion.setMensaje("Error, se ha quedado sin papel durante la impresión. Favor cargue la impresora de papel y vuelva a intentar.");


          }else if(getSUEMessage(arg0.getStatus()).equals("Cover OK")){

          }else if(getSUEMessage(arg0.getStatus()).equals("Receipt Paper Empty")){
            estadoImpresion.setHuboError(true);
            estadoImpresion.setMensaje("Error, se ha abierto la cajetilla durante la impresión. Favor cierre la cajetilla y vuelva a imprimir.");
          }else if(getSUEMessage(arg0.getStatus()).equals("Receipt Paper OK")){
          }
        }
      });

      try {
        for (Object entry : bxlConfigLoader.getEntries()) {
          JposEntry jposEntry = (JposEntry) entry;
          bxlConfigLoader.removeEntry(jposEntry.getLogicalName());
        }
      } catch (Exception e) {
        e.printStackTrace();
      }

      try {

        bxlConfigLoader.addEntry(Nombre,
                BXLConfigLoader.DEVICE_CATEGORY_POS_PRINTER,
                Nombre,
                BXLConfigLoader.DEVICE_BUS_BLUETOOTH, MAC);

        bxlConfigLoader.saveFile();
      } catch (Exception e) {
        e.printStackTrace();
      }

      //sbDocumento.append(inventario);
      StringBuilder documento = new StringBuilder();
      documento.append(texto);




      try {
        posPrinter.open(Nombre);

        posPrinter.claim(0);
        posPrinter.setDeviceEnabled(true);
        posPrinter.setCharacterEncoding(BXLConst.CE_UTF8);
        Log.i("EstadoImpresion " + posPrinter.getCheckHealthText(),"Errpr");
        final Long tiempoImpresion = calcularTiempoImpresion(documento);

        final Handler handler = new Handler();
        Runnable runnable = new Runnable(){
          public void run() {
            try {
              if(estadoImpresion.getHuboError() ){
                posPrinter.close();
                result = new PluginResult(PluginResult.Status.ERROR, estadoImpresion.getMensaje());
                callbackContext.sendPluginResult(result);
              }else{
                posPrinter.close();
                result = new PluginResult(PluginResult.Status.OK, estadoImpresion.getMensaje());
                callbackContext.sendPluginResult(result);

              }


            } catch (JposException e) {
              e.printStackTrace();
            }

          }
        };

        handler.postDelayed(runnable, tiempoImpresion);
        posPrinter.printNormal(POSPrinterConst.PTR_S_RECEIPT, documento.toString() + "\n \n");

      } catch (JposException e) {
        e.printStackTrace();
        try {
          posPrinter.close();
        } catch (JposException e1) {
          e1.printStackTrace();
        }

          result = new PluginResult(PluginResult.Status.ERROR,"No se pudo abrir la conexion con la impresora, favor reinicie la impresora y pruebe nuevamente.");
          callbackContext.sendPluginResult(result);
      }

    }
    if(action.equals("buscar")) {
      // Buscamos los dispositivos Bluetooth emparejados al dispositivo
      JSONArray lista = setBondedDevices();
      callbackContext.success(lista);
    }
    if(action.equals("cerrar")) {
      // Buscamos los dispositivos Bluetooth emparejados al dispositivo
      try {
        posPrinter.close();
        result = new PluginResult(PluginResult.Status.OK,"Cerro");
        callbackContext.sendPluginResult(result);
      } catch (JposException e1) {
        e1.printStackTrace();
        result = new PluginResult(PluginResult.Status.ERROR," No Cerro");
        callbackContext.sendPluginResult(result);
      }


    }
    return true;
  }

  Long calcularTiempoImpresion(StringBuilder texto){

    // Calculamos el tiempo que delitará la impresión desde que inicia hasta que termina
    double caracteresxLinea = 64.0;
    double totalCaracteres = texto.toString().length();
    double LineasxSegundo = 15.0;
    double tiempoImpresionSegundos = 0.0;
    Long TimeoutImpresionMilisegundos= 5000L;
    Long tiempoEsperaMilisegundos = 0L;
    double numeroLineas = totalCaracteres/caracteresxLinea;
    tiempoImpresionSegundos = numeroLineas / LineasxSegundo;
    Long tiempoImpresiónMilisegundos = ((Long.valueOf(Math.round(Math.ceil(tiempoImpresionSegundos)))) * 1000);
    tiempoEsperaMilisegundos = tiempoImpresiónMilisegundos + TimeoutImpresionMilisegundos;
    return tiempoEsperaMilisegundos;
  }

  private static String getERMessage(int status){
    switch(status){
      case POSPrinterConst.JPOS_EPTR_COVER_OPEN:
        return "Cover open";

      case POSPrinterConst.JPOS_EPTR_REC_EMPTY:
        return "Paper empty";

      case JposConst.JPOS_SUE_POWER_OFF_OFFLINE:
        return "Power off";

      default:
        return "Unknown";
    }
  }


  private static String getSUEMessage(int status){
    switch(status){
      case JposConst.JPOS_SUE_POWER_ONLINE:
        return "Power on";

      case JposConst.JPOS_SUE_POWER_OFF_OFFLINE:
        return "Power off";

      case POSPrinterConst.PTR_SUE_COVER_OPEN:
        return "Cover Open";

      case POSPrinterConst.PTR_SUE_COVER_OK:
        return "Cover OK";

      case POSPrinterConst.PTR_SUE_REC_EMPTY:
        return "Receipt Paper Empty";

      case POSPrinterConst.PTR_SUE_REC_NEAREMPTY:
        return "Receipt Paper Near Empty";

      case POSPrinterConst.PTR_SUE_REC_PAPEROK:
        return "Receipt Paper OK";

      case POSPrinterConst.PTR_SUE_IDLE:
        return "Printer Idle";

      default:
        return "Unknown";
    }
  }

  private JSONArray setBondedDevices() {

    JSONArray array = new JSONArray();
    JSONObject item;
    BluetoothAdapter bluetoothAdapter = BluetoothAdapter
            .getDefaultAdapter();
    Set<BluetoothDevice> bondedDeviceSet = bluetoothAdapter
            .getBondedDevices();
    for (BluetoothDevice device : bondedDeviceSet) {
      if( device.getName().equals("SPP-R300") || device.getName().equals("APEX3") || device.getName().equals("SPP-R310") ){
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



  @Override
  public void onDestroy() {
    super.onDestroy();
  }

}
