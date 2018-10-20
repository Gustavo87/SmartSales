
import java.io.InputStream;
import java.io.OutputStream;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.UUID;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;

/*
import org.apache.cordova.api.CordovaInterface;
import org.apache.cordova.api.Plugin;
import org.apache.cordova.api.PluginResult;
*/

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.app.Activity;
import android.app.AlertDialog;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothSocket;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Parcelable;
import android.util.Log;

//Plantillas Impresora Bixolon...
import com.apache.cordova.plugin.plantillaswifi.PlantillaInventarioWifi;
import com.apache.cordova.plugin.plantillaswifi.PlantillaFacturaWifi;
import com.apache.cordova.plugin.plantillaswifi.PlantillaReciboWifi;
import com.apache.cordova.plugin.plantillaswifi.PlantillaMinutaWifi;
import com.apache.cordova.plugin.plantillaswifi.PlantillaResumenPagoWifi;

public class BluetoothPlugin extends CordovaPlugin {
	private static final String ACTION_ENABLE = "enable";
	private static final String ACTION_DISABLE = "disable";
	private static final String ACTION_DISCOVERDEVICES = "discoverDevices";
	private static final String ACTION_GETUUIDS = "getUUIDs";
	private static final String ACTION_CONNECT = "connect";
	private static final String ACTION_READ = "read";
	private static final String ACTION_DISCONNECT = "disconnect";
	private static final String ACTION_WRITE = "write";
	
	private static String ACTION_UUID = "";
	private static String EXTRA_UUID = "";

	private BluetoothAdapter m_bluetoothAdapter = null;
	private BPBroadcastReceiver m_bpBroadcastReceiver = null;
	private boolean m_discovering = false;
	private boolean m_gettingUuids = false;
	private boolean m_stateChanging = false;

	private JSONArray m_discoveredDevices = null;
	private JSONArray m_gotUUIDs = null;
	
	private ArrayList<BluetoothSocket> m_bluetoothSockets = new ArrayList<BluetoothSocket>();
	
	private byte[] buffer;
	
	private int SOCKET_BLUETOOTH=0;
	
	
	//Sobrecarga para RECIBO en SPP-R300...
		public void imprimirCopiasR(int numeroCopia,PlantillaReciboWifi plantilla,int SOCKET_BLUETOOTH){
			//Activity activity  =(Activity)ctx;
			Activity activity  = cordova.getActivity(); 
			class  claseMostrarMensaje implements Runnable{
			Context contexto;
			int numeroCopia;
			PlantillaReciboWifi plantilla;
			int SOCKET_BLUETOOTH;
			claseMostrarMensaje(Context a,int n,PlantillaReciboWifi p,int s) {
			 contexto = a; 
			 numeroCopia=n;
			 plantilla=p;
			 SOCKET_BLUETOOTH=s;
			}
			public void run() {
				AlertDialog.Builder builder = new AlertDialog.Builder(contexto);
				builder.setTitle("Imprimiendo...");
				if(numeroCopia==1){
					builder.setMessage("Impreso Recibo Original. Imprimir Copia "+numeroCopia+"?");
				}else{
					builder.setMessage("Impresa copia "+ (numeroCopia-1) +". Imprimir Copia "+numeroCopia+"?");
				}

				builder.setPositiveButton("Imprimir", new DialogInterface.OnClickListener() {  
		            public void onClick(DialogInterface dialog, int id) {
		            	
		    			plantilla.setnumeroCopia(numeroCopia);
		    			numeroCopia=numeroCopia+1;
		    			plantilla.setTipoImpresion("RECIBOCOPIA");
		    			byte[] buffer=plantilla.getReciboPago().getBytes();
		    			BluetoothSocket socket = m_bluetoothSockets.get(SOCKET_BLUETOOTH);
		    			try {
		    				OutputStream outputStream = socket.getOutputStream();
		    				outputStream.write(buffer);
		    			} catch (Exception e) {
		    				logErr(e.toString() + " / " + e.getMessage() + " | Escritura");
		    			}
		    			
		            	if(numeroCopia<=2){
		            		imprimirCopiasR(numeroCopia,plantilla,SOCKET_BLUETOOTH);
		            		}
		            }  
		            }); 
				AlertDialog alert = builder.create();
				alert.show(); 
			}
			}
			activity.runOnUiThread(new claseMostrarMensaje(activity,numeroCopia,plantilla,SOCKET_BLUETOOTH));
		}
	
	//Sobrecarga para RECIBO  en APEX3...
		public void imprimirCopiasR(int numeroCopia,PlantillaRecibo plantilla,int SOCKET_BLUETOOTH){
			//Activity activity  =(Activity)ctx;
			Activity activity  = cordova.getActivity(); 
			
			class  claseMostrarMensaje implements Runnable{
			Context contexto;
			int numeroCopia;
			PlantillaRecibo plantilla;
			int SOCKET_BLUETOOTH;
			claseMostrarMensaje(Context a,int n,PlantillaRecibo p,int s) {
			 contexto = a; 
			 numeroCopia=n;
			 plantilla=p;
			 SOCKET_BLUETOOTH=s;
			}
			public void run() {
				AlertDialog.Builder builder = new AlertDialog.Builder(contexto);
				builder.setTitle("Imprimiendo...");
				if(numeroCopia==1){
					builder.setMessage("Impreso Recibo Original. Imprimir Copia "+numeroCopia+"?");
				}else{
					builder.setMessage("Impresa copia "+ (numeroCopia-1) +". Imprimir Copia "+numeroCopia+"?");
				}

				builder.setPositiveButton("Imprimir", new DialogInterface.OnClickListener() {  
		            public void onClick(DialogInterface dialog, int id) {
		            	
		    			plantilla.setnumeroCopia(numeroCopia);
		    			numeroCopia=numeroCopia+1;
		    			plantilla.setTipoImpresion("RECIBOCOPIA");
		    			byte[] buffer=plantilla.getReciboPago().getBytes();
		    			BluetoothSocket socket = m_bluetoothSockets.get(SOCKET_BLUETOOTH);
		    			try {
		    				OutputStream outputStream = socket.getOutputStream();
		    				outputStream.write(buffer);
		    			} catch (Exception e) {
		    				logErr(e.toString() + " / " + e.getMessage() + " | Escritura");
		    			}
		    			
		            	if(numeroCopia<=2){
		            		imprimirCopiasR(numeroCopia,plantilla,SOCKET_BLUETOOTH);
		            		}
		            }  
		            }); 
				AlertDialog alert = builder.create();
				alert.show(); 
			}
			}
			//activity.runOnUiThread(new claseMostrarMensaje(ctx.getContext(),numeroCopia,plantilla,SOCKET_BLUETOOTH));
			activity.runOnUiThread(new claseMostrarMensaje(activity,numeroCopia,plantilla,SOCKET_BLUETOOTH));
		}		
				
	//Sobrecarga para FACTURA en SPP-R300...
	public void imprimirCopias(int numeroCopia,PlantillaFacturaWifi plantilla,int SOCKET_BLUETOOTH){
		//Activity activity  =(Activity)ctx;
		Activity activity  = cordova.getActivity(); 
		
		class  claseMostrarMensaje implements Runnable{
		Context contexto;
		int numeroCopia;
		PlantillaFacturaWifi plantilla;
		int SOCKET_BLUETOOTH;
		claseMostrarMensaje(Context a,int n,PlantillaFacturaWifi p,int s) {
		 contexto = a; 
		 numeroCopia=n;
		 plantilla=p;
		 SOCKET_BLUETOOTH=s;
		}
		public void run() {
			AlertDialog.Builder builder = new AlertDialog.Builder(contexto);
			builder.setTitle("Imprimiendo...");
			if(numeroCopia==1){
				builder.setMessage("Impresa Factura Original. Imprimir Copia "+numeroCopia+"?");
			}else{
				builder.setMessage("Impresa copia "+ (numeroCopia-1) +". Imprimir Copia "+numeroCopia+"?");
			}

			builder.setPositiveButton("Imprimir", new DialogInterface.OnClickListener() {  
	            public void onClick(DialogInterface dialog, int id) {
	            	
	    			plantilla.setnumeroCopia(numeroCopia);
	    			numeroCopia=numeroCopia+1;
	    			plantilla.setTipoImpresion("FACTURACOPIA");
	    			byte[] buffer=plantilla.getFactura().getBytes();
	    			BluetoothSocket socket = m_bluetoothSockets.get(SOCKET_BLUETOOTH);
	    			try {
	    				OutputStream outputStream = socket.getOutputStream();
	    				outputStream.write(buffer);
	    			} catch (Exception e) {
	    				logErr(e.toString() + " / " + e.getMessage() + " | Escritura");
	    			}
	    			
	            	if(numeroCopia<=2){
	            		 imprimirCopias(numeroCopia,plantilla,SOCKET_BLUETOOTH);
	            		}
	            }  
	            }); 
			AlertDialog alert = builder.create();
			alert.show(); 
		}
		}
		//activity.runOnUiThread(new claseMostrarMensaje(ctx.getContext(),numeroCopia,plantilla,SOCKET_BLUETOOTH));
		activity.runOnUiThread(new claseMostrarMensaje(activity,numeroCopia,plantilla,SOCKET_BLUETOOTH));
	}
	
	//Sobrecarga para FACTURA en APEX3
	public void imprimirCopias(int numeroCopia,PlantillaFactura plantilla,int SOCKET_BLUETOOTH){
		
		//Activity activity  =(Activity)ctx;
		Activity activity  = cordova.getActivity(); 
		
		class  claseMostrarMensaje implements Runnable{
		Context contexto;
		int numeroCopia;
		PlantillaFactura plantilla;
		int SOCKET_BLUETOOTH;
		claseMostrarMensaje(Context a,int n,PlantillaFactura p,int s) {
		 contexto = a; 
		 numeroCopia=n;
		 plantilla=p;
		 SOCKET_BLUETOOTH=s;
		}
		public void run() {
			AlertDialog.Builder builder = new AlertDialog.Builder(contexto);
			builder.setTitle("Imprimiendo...");
			if(numeroCopia==1){
				builder.setMessage("Impresa Factura Original. Imprimir Copia "+numeroCopia+"?");
			}else{
				builder.setMessage("Impresa copia "+ (numeroCopia-1) +". Imprimir Copia "+numeroCopia+"?");
			}

			builder.setPositiveButton("Imprimir", new DialogInterface.OnClickListener() {  
	            public void onClick(DialogInterface dialog, int id) {
	            	
	    			plantilla.setnumeroCopia(numeroCopia);
	    			numeroCopia=numeroCopia+1;
	    			plantilla.setTipoImpresion("FACTURACOPIA");
	    			byte[] buffer=plantilla.getFactura().getBytes();
	    			BluetoothSocket socket = m_bluetoothSockets.get(SOCKET_BLUETOOTH);
	    			try {
	    				OutputStream outputStream = socket.getOutputStream();
	    				outputStream.write(buffer);
	    			} catch (Exception e) {
	    				logErr(e.toString() + " / " + e.getMessage() + " | Escritura");
	    			}
	    			
	            	if(numeroCopia<=2){
	            		 imprimirCopias(numeroCopia,plantilla,SOCKET_BLUETOOTH);
	            		}
	            }  
	            }); 
			AlertDialog alert = builder.create();
			alert.show(); 
		}
		}
	//	activity.runOnUiThread(new claseMostrarMensaje(ctx.getContext(),numeroCopia,plantilla,SOCKET_BLUETOOTH));
		activity.runOnUiThread(new claseMostrarMensaje(activity,numeroCopia,plantilla,SOCKET_BLUETOOTH));
	}
	
	/**
	 * Constructor for Bluetooth plugin
	 */
	public BluetoothPlugin() {
		m_bluetoothAdapter = BluetoothAdapter.getDefaultAdapter();
		m_bpBroadcastReceiver = new BPBroadcastReceiver();
		
		try {
			Field actionUUID = BluetoothDevice.class.getDeclaredField("ACTION_UUID");
			BluetoothPlugin.ACTION_UUID = (String) actionUUID.get(null);
			Log.d("BluetoothPlugin", "actionUUID: " + actionUUID.getName() + " / " + actionUUID.get(null));

			Field extraUUID = BluetoothDevice.class.getDeclaredField("EXTRA_UUID");
			BluetoothPlugin.EXTRA_UUID = (String) extraUUID.get(null);
			Log.d("BluetoothPlugin", "extraUUID: " + extraUUID.getName() + " / " + extraUUID.get(null));
		}
		catch( Exception e ) {
			Log.e("BluetoothPlugin", e.getMessage() );
		}
	}
	
	/**
	 * Register receiver as soon as we have the context
	 */
	/*
	@Override
	public void setContext(CordovaInterface ctx) {
		super.setContext(ctx);

		// Register for necessary bluetooth events
		ctx.registerReceiver(m_bpBroadcastReceiver, new IntentFilter(
				BluetoothAdapter.ACTION_DISCOVERY_FINISHED));
		ctx.registerReceiver(m_bpBroadcastReceiver, new IntentFilter(
				BluetoothDevice.ACTION_FOUND));
		ctx.registerReceiver(m_bpBroadcastReceiver, new IntentFilter(BluetoothPlugin.ACTION_UUID));
		//ctx.registerReceiver(m_bpBroadcastReceiver, new IntentFilter(BluetoothAdapter.ACTION_STATE_CHANGED));
	}
    */
	
	public void initialize(CordovaInterface ctx, CordovaWebView webView) {
		super.initialize(ctx, webView);
		
		webView.getContext().registerReceiver(m_bpBroadcastReceiver, new IntentFilter(
				BluetoothAdapter.ACTION_DISCOVERY_FINISHED));
		webView.getContext().registerReceiver(m_bpBroadcastReceiver, new IntentFilter(
				BluetoothDevice.ACTION_FOUND));
		webView.getContext().registerReceiver(m_bpBroadcastReceiver, new IntentFilter(BluetoothPlugin.ACTION_UUID));
	}
	
	/**
	 * Execute a bluetooth function
	 */
	@Override
	public boolean execute(String action, JSONArray args, CallbackContext CallbackContext) {
		//PluginResult pluginResult = null;
		
		Log.d("BluetoothPlugin", "Action: " + action);
		
		if (ACTION_ENABLE.equals(action)) {
			// Check if bluetooth isn't disabled already
           
			try {
				if( !m_bluetoothAdapter.isEnabled() ) {
					m_stateChanging = true;
					//ctx.startActivityForResult(this, new Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE), 1);
					cordova.startActivityForResult(this, new Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE), 1);
					while(m_stateChanging) {};
				}
				
				// Check if bluetooth is enabled now
				if(m_bluetoothAdapter.isEnabled()) {
					
					//pluginResult = new PluginResult(PluginResult.Status.OK);
					CallbackContext.success("OK");
				}
				else {
					
					//pluginResult = new PluginResult(PluginResult.Status.ERROR);
					CallbackContext.error("ERROR");
				}
			} catch (Exception e) {
				// TODO: handle exception
			}
		}
		// Want to disable bluetooth?
		else if (ACTION_DISABLE.equals(action)) {
			try {
				if( !m_bluetoothAdapter.disable() && m_bluetoothAdapter.isEnabled() ) {
					
					//pluginResult = new PluginResult(PluginResult.Status.ERROR);
					CallbackContext.error("ERROR");
				}
				else {
					
					//pluginResult = new PluginResult(PluginResult.Status.OK);
					CallbackContext.success("OK");
				}
			} catch (Exception e) {
				// TODO: handle exception
			}
			
		}
		else if (ACTION_DISCOVERDEVICES.equals(action)) {
			try {
				m_discoveredDevices = new JSONArray();

				if (!m_bluetoothAdapter.startDiscovery()) {
					//pluginResult = new PluginResult(PluginResult.Status.ERROR,"Unable to start discovery");
					CallbackContext.error("Unable to start discovery");
				} else {
					m_discovering = true;

					// Wait for discovery to finish
					while (m_discovering) {}
					
					Log.d("BluetoothPlugin", "DiscoveredDevices: " + m_discoveredDevices.length());
					
					//pluginResult = new PluginResult(PluginResult.Status.OK, m_discoveredDevices);
					CallbackContext.success(m_discoveredDevices);
				}
			} catch (Exception e) {
				// TODO: handle exception
			}
		}
		// Want to list UUIDs of a certain device
		else if( ACTION_GETUUIDS.equals(action) ) {
			try {
				String address = args.getString(0);
				Log.d("BluetoothPlugin", "Listing UUIDs for: " + address);
				
				// Fetch UUIDs from bluetooth device
				BluetoothDevice bluetoothDevice = m_bluetoothAdapter.getRemoteDevice(address);
				Method m = bluetoothDevice.getClass().getMethod("fetchUuidsWithSdp");
				Log.d("BluetoothPlugin", "Method: " + m);
				m.invoke(bluetoothDevice);
				
				m_gettingUuids = true;
				
				while(m_gettingUuids) {}
				
				//pluginResult = new PluginResult(PluginResult.Status.OK, m_gotUUIDs);
				CallbackContext.success(m_gotUUIDs);
				
			}
			catch( Exception e ) {
				Log.e("BluetoothPlugin", e.toString() + " / " + e.getMessage() );
				
				//pluginResult = new PluginResult(PluginResult.Status.JSON_EXCEPTION, e.getMessage());
				CallbackContext.error(e.getMessage());
			}
		}
		// Connect to a given device & uuid endpoint
		else if( ACTION_CONNECT.equals(action) ) {
			try {
				String address = args.getString(0);
				UUID uuid = UUID.fromString(args.getString(1));
				
				Log.d( "BluetoothPlugin", "Connecting..." );

				BluetoothDevice bluetoothDevice = m_bluetoothAdapter.getRemoteDevice(address);
				//BluetoothSocket bluetoothSocket = bluetoothDevice.createRfcommSocketToServiceRecord(uuid);
				BluetoothSocket bluetoothSocket = bluetoothDevice.createInsecureRfcommSocketToServiceRecord(uuid);
				bluetoothSocket.connect();
				
				m_bluetoothSockets.add(bluetoothSocket);
				int socketId = m_bluetoothSockets.indexOf(bluetoothSocket);
				
				//pluginResult = new PluginResult(PluginResult.Status.OK, socketId);
				CallbackContext.success(socketId);
			}
			catch( Exception e ) {
				Log.e("BluetoothPlugin", e.toString() + " / " + e.getMessage() );
				
				//pluginResult = new PluginResult(PluginResult.Status.JSON_EXCEPTION, e.getMessage());
				CallbackContext.error(e.getMessage());
			}
		}
		else if( ACTION_READ.equals(action) ) {
			try {
				int socketId = args.getInt(0);
				
				BluetoothSocket bluetoothSocket = m_bluetoothSockets.get(socketId);
				InputStream inputStream = bluetoothSocket.getInputStream();
				
				char[] buffer = new char[128];
				for( int i = 0; i < buffer.length; i++ ) {
					buffer[i] = (char) inputStream.read();
				}
				
				//Log.d( "BluetoothPlugin", "Buffer: " + String.valueOf(buffer) );
				//pluginResult = new PluginResult(PluginResult.Status.OK, String.valueOf(buffer));
				CallbackContext.success(String.valueOf(buffer));
			}
			catch( Exception e ) {
				Log.e("BluetoothPlugin", e.toString() + " / " + e.getMessage() );
				
				//pluginResult = new PluginResult(PluginResult.Status.JSON_EXCEPTION, e.getMessage());
				CallbackContext.error(e.getMessage());
			}
		}
		else if( ACTION_DISCONNECT.equals(action) ) {
			try {
				int socketId = args.getInt(0);
				
				// Fetch socket & close it
				BluetoothSocket bluetoothSocket = m_bluetoothSockets.get(socketId);
				bluetoothSocket.close();
				
				// Remove socket from internal list
				m_bluetoothSockets.remove(socketId);
				
				// Everything went fine...
				//pluginResult = new PluginResult(PluginResult.Status.OK);
				CallbackContext.success("OK");
			}
			catch( Exception e ) {
				Log.e("BluetoothPlugin", e.toString() + " / " + e.getMessage() );
				
				//pluginResult = new PluginResult(PluginResult.Status.JSON_EXCEPTION, e.getMessage());
				CallbackContext.error(e.getMessage());
			}
		}else if ( ACTION_WRITE.equals(action) )
			
		 {
	 	
	      try {
	    	  
	    	SOCKET_BLUETOOTH=args.getInt(0);
	       // pluginResult = action_write(args.getInt(0), args.getJSONObject(1)); //.getJSONArray(1)
	          action_write(args.getInt(0), args.getJSONObject(1),CallbackContext); //.getJSONArray(1)
		
	      } catch (Exception e) {
	    	    String msg = e.toString() + " / " + e.getMessage();
		  		
		        logErr( msg );
			
		        //pluginResult = new PluginResult(PluginResult.Status.JSON_EXCEPTION, msg + " | En la accion de escritura");
		        CallbackContext.error(msg);
	      }

	     }

		return true;
	}
	
	/**
	 * write() function
	 * @param socketId socket id
	 * @param jsonArray array that contains byte values
	 * @return
	 */
	private void action_write(int socketId, JSONObject impresion,CallbackContext CallbackContext) {
	//	PluginResult pluginResult;
		BluetoothSocket socket = m_bluetoothSockets.get(socketId);
		
		try {
			OutputStream outputStream = socket.getOutputStream();
			
			if (impresion.optString("tipoBoucher").equals("FACTURACION")) {
				
				if(impresion.optString("impresoraEnUso").equals("APEX3")){
					PlantillaFactura plantilla = new PlantillaFactura();
					plantilla.setTipoImpresion(impresion.optString("tipoImpresion"));
			        plantilla.setTitulo(impresion.optString("tituloFactura"));
			        plantilla.setCodigo(impresion.optString("codigoCliente"));
			        plantilla.setRuta(impresion.optString("ruta"));
			        plantilla.setCliente(impresion.optString("cliente"));
			        plantilla.setCodFactura(impresion.optString("numeroFactura"));
			        plantilla.setFactNum(impresion.optString("factNumero"));
			        plantilla.setFecha(impresion.optString("fecha"));
			        plantilla.setFechaFact(impresion.optString("fechaFact"));
			        plantilla.setHora(impresion.optString("hora"));
			        plantilla.setPedido(impresion.optString("pedido"));
			        plantilla.setTipoFactura(impresion.optString("tipoFacturacion"));
			        plantilla.setSubtotal(impresion.optString("subTotal"));
			        plantilla.setIva(impresion.optString("IVA"));
			        plantilla.setTotal(impresion.optString("total"));
			        plantilla.setMontoOriginal(impresion.optString("montoOriginal"));
			        plantilla.setSaldo(impresion.optString("saldo"));
			        plantilla.setRucCliente(impresion.optString("rucCliente"));
			        plantilla.setDatosLineas(impresion.optJSONArray("detalleFactura"));
			        plantilla.setfacturaManual(impresion.optString("facturaManual"));
			        
					if (impresion.optString("tituloFactura").equals("FACTURA")) {
						plantilla.setCopias(Integer.parseInt(impresion.optString("copias")));
						
						//Imprime factura original...
						setBuffer(plantilla.getFactura().getBytes());
						outputStream.write(getBuffer());
						
						if(impresion.optString("tipoImpresion").equals("ORIGINAL")){
							//Imprime copias...
							imprimirCopias(1,plantilla,SOCKET_BLUETOOTH);
						}
						
						//pluginResult = new PluginResult(PluginResult.Status.OK);
						//return pluginResult;
						CallbackContext.success("OK");
						return;
						
					} else if (impresion.optString("tituloFactura").equals("CAMBIO")) {
						plantilla.setCopias(Integer.parseInt(impresion.optString("copias")));
						
						setBuffer(plantilla.getFactCambio().getBytes());
					} else if (impresion.optString("tituloFactura").equals("DEVOLUCION")) {
						plantilla.setCopias(Integer.parseInt(impresion.optString("copias")));
						
						setBuffer(plantilla.getFactDevolucion().getBytes());
					}
				}
				else if(impresion.optString("impresoraEnUso").equals("SPP-R300")){
					PlantillaFacturaWifi plantilla = new PlantillaFacturaWifi();
					plantilla.setTipoImpresion(impresion.optString("tipoImpresion"));
			        plantilla.setTitulo(impresion.optString("tituloFactura"));
			        plantilla.setCodigo(impresion.optString("codigoCliente"));
			        plantilla.setRuta(impresion.optString("ruta"));
			        plantilla.setCliente(impresion.optString("cliente"));
			        plantilla.setCodFactura(impresion.optString("numeroFactura"));
			        plantilla.setFactNum(impresion.optString("factNumero"));
			        plantilla.setFecha(impresion.optString("fecha"));
			        plantilla.setFechaFact(impresion.optString("fechaFact"));
			        plantilla.setHora(impresion.optString("hora"));
			        plantilla.setPedido(impresion.optString("pedido"));
			        plantilla.setTipoFactura(impresion.optString("tipoFacturacion"));
			        plantilla.setSubtotal(impresion.optString("subTotal"));
			        plantilla.setIva(impresion.optString("IVA"));
			        plantilla.setTotal(impresion.optString("total"));
			        plantilla.setMontoOriginal(impresion.optString("montoOriginal"));
			        plantilla.setSaldo(impresion.optString("saldo"));
			        plantilla.setRucCliente(impresion.optString("rucCliente"));
			        plantilla.setDatosLineas(impresion.optJSONArray("detalleFactura"));
			        
			        
			        plantilla.setfacturaManual(impresion.optString("facturaManual"));
			        
					if (impresion.optString("tituloFactura").equals("FACTURA")) {
						plantilla.setCopias(Integer.parseInt(impresion.optString("copias")));
						
						//Imprime factura original...
						setBuffer(plantilla.getFactura().getBytes());
						outputStream.write(getBuffer());
						

						if(impresion.optString("tipoImpresion").equals("ORIGINAL")){
							//Imprime copias...
							imprimirCopias(1,plantilla,SOCKET_BLUETOOTH);
						}
						
						//pluginResult = new PluginResult(PluginResult.Status.OK);
						//return pluginResult;
						CallbackContext.success("OK");
						return;
						
					} else if (impresion.optString("tituloFactura").equals("CAMBIO")) {
						plantilla.setCopias(Integer.parseInt(impresion.optString("copias")));
						
						setBuffer(plantilla.getFactCambio().getBytes());
					} else if (impresion.optString("tituloFactura").equals("DEVOLUCION")) {
						plantilla.setCopias(Integer.parseInt(impresion.optString("copias")));
						
						setBuffer(plantilla.getFactDevolucion().getBytes());
					}
				}
				else{
					//pluginResult = new PluginResult(PluginResult.Status.ERROR,"Dispositivo invalido: "+impresion.optString("impresoraEnUso"));
					//return pluginResult;
					CallbackContext.error("Dispositivo invalido: "+impresion.optString("impresoraEnUso"));
					return;
				}
				
				
			} else if (impresion.optString("tipoBoucher").equals("MINUTA")) {
				
				if(impresion.optString("impresoraEnUso").equals("APEX3")){
					PlantillaMinuta pmMinutaDeposito = new PlantillaMinuta();
					
					pmMinutaDeposito.setTituloMinuta(impresion.optString("tituloMinuta"));
					pmMinutaDeposito.setMinutaNumero(impresion.optString("numeroMinuta"));
					pmMinutaDeposito.setFecha(impresion.optString("fecha"));
					pmMinutaDeposito.setHora(impresion.optString("hora"));
					pmMinutaDeposito.setRuta(impresion.optString("ruta"));
					pmMinutaDeposito.setTotalEfectivoNIO(impresion.optString("totalEfectivoNIO"));
					pmMinutaDeposito.setTotalChequeNIO(impresion.optString("totalChequesNIO"));
					pmMinutaDeposito.setTotalEfectivoUS(impresion.optString("totalEfectivoUS"));
					pmMinutaDeposito.setTotalChequeUS(impresion.optString("totalChequesUS"));
					pmMinutaDeposito.setBanco(impresion.optString("banco"));
					
					setBuffer(pmMinutaDeposito.getMinutaDeposito().getBytes());
				}
				else if(impresion.optString("impresoraEnUso").equals("SPP-R300")){
					PlantillaMinutaWifi pmMinutaDeposito = new PlantillaMinutaWifi();
					
					pmMinutaDeposito.setTituloMinuta(impresion.optString("tituloMinuta"));
					pmMinutaDeposito.setMinutaNumero(impresion.optString("numeroMinuta"));
					pmMinutaDeposito.setFecha(impresion.optString("fecha"));
					pmMinutaDeposito.setHora(impresion.optString("hora"));
					pmMinutaDeposito.setRuta(impresion.optString("ruta"));
					pmMinutaDeposito.setTotalEfectivoNIO(impresion.optString("totalEfectivoNIO"));
					pmMinutaDeposito.setTotalChequeNIO(impresion.optString("totalChequesNIO"));
					pmMinutaDeposito.setTotalEfectivoUS(impresion.optString("totalEfectivoUS"));
					pmMinutaDeposito.setTotalChequeUS(impresion.optString("totalChequesUS"));
					pmMinutaDeposito.setBanco(impresion.optString("banco"));
					
					setBuffer(pmMinutaDeposito.getMinutaDeposito().getBytes());
				}
				else{
				//	pluginResult = new PluginResult(PluginResult.Status.ERROR,"Dispositivo invalido: "+impresion.optString("impresoraEnUso"));
				//	return pluginResult;
					CallbackContext.error("Dispositivo invalido: "+impresion.optString("impresoraEnUso"));
					return;
				}
				
			}else if(impresion.optString("tipoBoucher").equals("RESUMEN_PAGO")) 
			{
				if(impresion.optString("impresoraEnUso").equals("APEX3")){
					PlantillaResumenPago pmResumenPago = new PlantillaResumenPago();
					
					pmResumenPago.setTituloMinuta(impresion.optString("tituloMinuta"));
					pmResumenPago.setMinutaNumero(impresion.optString("numeroMinuta"));
					pmResumenPago.setFecha(impresion.optString("fecha"));
					pmResumenPago.setHora(impresion.optString("hora"));
					pmResumenPago.setRuta(impresion.optString("ruta"));
					
					pmResumenPago.setTotalEfectivoNIO  (impresion.optString("totalEfectivoNIO"));
					pmResumenPago.setTotalChequeNIO  ( impresion.optString("totalChequeNIO"));
					pmResumenPago.setTotalTarjetaNIO ( impresion.optString("totalTarjetaNIO"));
					pmResumenPago.setTotalMinutaNIO ( impresion.optString("totalMinutaNIO"));
					pmResumenPago.setTotalMinutaBACNIO  ( impresion.optString("totalMinutaBACNIO"));
					pmResumenPago.setTotalMinutaBDFNIO ( impresion.optString("totalMinutaBDFNIO"));
					pmResumenPago.setTotalMinutaBANPRONIO ( impresion.optString("totalMinutaBANPRONIO"));
					pmResumenPago.setTotalMinutaLAFISENIO ( impresion.optString("totalMinutaLAFISENIO"));
					pmResumenPago.setTotalMinutaCITINIO ( impresion.optString("totalMinutaCITINIO"));
					pmResumenPago.setTotalMinutaPROCREDITNIO ( impresion.optString("totalMinutaPROCREDITNIO"));
					pmResumenPago.setTotalMinutaBCENTRALNIO ( impresion.optString("totalMinutaBCENTRALNIO"));
					pmResumenPago.setTotalEfectivoUS  ( impresion.optString("totalEfectivoUS"));
					pmResumenPago.setTotalChequeUS ( impresion.optString("totalChequeUS"));
					pmResumenPago.setTotalMinutaUS ( impresion.optString("totalMinutaUS"));
					pmResumenPago.setTotalMinutaBACUS  ( impresion.optString("totalMinutaBACUS"));
					pmResumenPago.setTotalMinutaBDFUS ( impresion.optString("totalMinutaBDFUS"));
					pmResumenPago.setTotalMinutaBANPROUS ( impresion.optString("totalMinutaBANPROUS"));
					pmResumenPago.setTotalMinutaLAFISEUS ( impresion.optString("totalMinutaLAFISEUS"));
					pmResumenPago.setTotalMinutaCITIUS ( impresion.optString("totalMinutaCITIUS"));
					pmResumenPago.setTotalMinutaPROCREDITUS ( impresion.optString("totalMinutaPROCREDITUS"));
					pmResumenPago.setTotalMinutaBCENTRALUS ( impresion.optString("totalMinutaBCENTRALUS"));
					
					//Se agrega para el nuevo tipo de pago 8 (Tarjeta Dolar)
					//2016.02.05 mroque
					pmResumenPago.setTotalTarjetaUS(impresion.optString("totalTarjetaUS"));
					
					setBuffer(pmResumenPago.getResumenPago().getBytes());
				}
				else if(impresion.optString("impresoraEnUso").equals("SPP-R300")){
					PlantillaResumenPagoWifi pmResumenPago = new PlantillaResumenPagoWifi();
					
					pmResumenPago.setTituloMinuta(impresion.optString("tituloMinuta"));
					pmResumenPago.setMinutaNumero(impresion.optString("numeroMinuta"));
					pmResumenPago.setFecha(impresion.optString("fecha"));
					pmResumenPago.setHora(impresion.optString("hora"));
					pmResumenPago.setRuta(impresion.optString("ruta"));
					
					pmResumenPago.setTotalEfectivoNIO  (impresion.optString("totalEfectivoNIO"));
					pmResumenPago.setTotalChequeNIO  ( impresion.optString("totalChequeNIO"));
					pmResumenPago.setTotalTarjetaNIO ( impresion.optString("totalTarjetaNIO"));
					pmResumenPago.setTotalMinutaNIO ( impresion.optString("totalMinutaNIO"));
					pmResumenPago.setTotalMinutaBACNIO  ( impresion.optString("totalMinutaBACNIO"));
					pmResumenPago.setTotalMinutaBDFNIO ( impresion.optString("totalMinutaBDFNIO"));
					pmResumenPago.setTotalMinutaBANPRONIO ( impresion.optString("totalMinutaBANPRONIO"));
					pmResumenPago.setTotalMinutaLAFISENIO ( impresion.optString("totalMinutaLAFISENIO"));
					pmResumenPago.setTotalMinutaCITINIO ( impresion.optString("totalMinutaCITINIO"));
					pmResumenPago.setTotalMinutaPROCREDITNIO ( impresion.optString("totalMinutaPROCREDITNIO"));
					pmResumenPago.setTotalMinutaBCENTRALNIO ( impresion.optString("totalMinutaBCENTRALNIO"));
					pmResumenPago.setTotalEfectivoUS  ( impresion.optString("totalEfectivoUS"));
					pmResumenPago.setTotalChequeUS ( impresion.optString("totalChequeUS"));
					pmResumenPago.setTotalMinutaUS ( impresion.optString("totalMinutaUS"));
					pmResumenPago.setTotalMinutaBACUS  ( impresion.optString("totalMinutaBACUS"));
					pmResumenPago.setTotalMinutaBDFUS ( impresion.optString("totalMinutaBDFUS"));
					pmResumenPago.setTotalMinutaBANPROUS ( impresion.optString("totalMinutaBANPROUS"));
					pmResumenPago.setTotalMinutaLAFISEUS ( impresion.optString("totalMinutaLAFISEUS"));
					pmResumenPago.setTotalMinutaCITIUS ( impresion.optString("totalMinutaCITIUS"));
					pmResumenPago.setTotalMinutaPROCREDITUS ( impresion.optString("totalMinutaPROCREDITUS"));
					pmResumenPago.setTotalMinutaBCENTRALUS ( impresion.optString("totalMinutaBCENTRALUS"));
					
					//Se agrega para el nuevo tipo de pago 8 (Tarjeta Dolar)
					//2016.02.05 mroque
					pmResumenPago.setTotalTarjetaUS(impresion.optString("totalTarjetaUS"));
					
					setBuffer(pmResumenPago.getResumenPago().getBytes());
				}
				else{
					//pluginResult = new PluginResult(PluginResult.Status.ERROR,"Dispositivo invalido: "+impresion.optString("impresoraEnUso"));
					//return pluginResult;
					CallbackContext.error("Dispositivo invalido: "+impresion.optString("impresoraEnUso"));
					return;
				}
			}			
			
			
			else if (impresion.optString("tipoBoucher").equals("RESUMEN_DIA")) {
				if(impresion.optString("impresoraEnUso").equals("APEX3")){
					PlantillaMinuta pmMinutaDeposito = new PlantillaMinuta();
					
					pmMinutaDeposito.setTituloMinuta(impresion.optString("tituloMinuta"));
					pmMinutaDeposito.setMinutaNumero(impresion.optString("numeroMinuta"));
					pmMinutaDeposito.setFecha(impresion.optString("fecha"));
					pmMinutaDeposito.setHora(impresion.optString("hora"));
					pmMinutaDeposito.setRuta(impresion.optString("ruta"));
					pmMinutaDeposito.setTotalEfectivoNIO(impresion.optString("totalEfectivoNIO"));
					pmMinutaDeposito.setTotalChequeNIO(impresion.optString("totalChequesNIO"));
					pmMinutaDeposito.setTotalEfectivoUS(impresion.optString("totalEfectivoUS"));
					pmMinutaDeposito.setTotalChequeUS(impresion.optString("totalChequesUS"));
					
					setBuffer(pmMinutaDeposito.getResumenDia().getBytes());
				}
				else if(impresion.optString("impresoraEnUso").equals("SPP-R300")){
					PlantillaMinutaWifi pmMinutaDeposito = new PlantillaMinutaWifi();
					
					pmMinutaDeposito.setTituloMinuta(impresion.optString("tituloMinuta"));
					pmMinutaDeposito.setMinutaNumero(impresion.optString("numeroMinuta"));
					pmMinutaDeposito.setFecha(impresion.optString("fecha"));
					pmMinutaDeposito.setHora(impresion.optString("hora"));
					pmMinutaDeposito.setRuta(impresion.optString("ruta"));
					pmMinutaDeposito.setTotalEfectivoNIO(impresion.optString("totalEfectivoNIO"));
					pmMinutaDeposito.setTotalChequeNIO(impresion.optString("totalChequesNIO"));
					pmMinutaDeposito.setTotalEfectivoUS(impresion.optString("totalEfectivoUS"));
					pmMinutaDeposito.setTotalChequeUS(impresion.optString("totalChequesUS"));
					
					setBuffer(pmMinutaDeposito.getResumenDia().getBytes());
				}
				else{
					//pluginResult = new PluginResult(PluginResult.Status.ERROR,"Dispositivo invalido: "+impresion.optString("impresoraEnUso"));
					//return pluginResult;
					CallbackContext.error("Dispositivo invalido: "+impresion.optString("impresoraEnUso"));
					return;
				}
				
			}  else if (impresion.optString("tipoBoucher").equals("INVENTARIO")) {
							
				if(impresion.optString("impresoraEnUso").equals("APEX3")){
					PlantillaInventario pmInventarioABordo = new PlantillaInventario();
					pmInventarioABordo.setTituloInventario(impresion.optString("tituloInventario"));
					pmInventarioABordo.setRuta(impresion.optString("ruta"));
					pmInventarioABordo.setHora(impresion.optString("hora"));
					pmInventarioABordo.setFecha(impresion.optString("fecha"));
					pmInventarioABordo.setDetalleInventario(impresion.optJSONArray("detalleInventario"));
					setBuffer(pmInventarioABordo.getInventarioABordo().getBytes());
				}
				else if(impresion.optString("impresoraEnUso").equals("SPP-R300")){
					PlantillaInventarioWifi pmInventarioABordo = new PlantillaInventarioWifi();
					pmInventarioABordo.setTituloInventario(impresion.optString("tituloInventario"));
					pmInventarioABordo.setRuta(impresion.optString("ruta"));
					pmInventarioABordo.setHora(impresion.optString("hora"));
					pmInventarioABordo.setFecha(impresion.optString("fecha"));
					pmInventarioABordo.setDetalleInventario(impresion.optJSONArray("detalleInventario"));
					
					setBuffer(pmInventarioABordo.getInventarioABordo().getBytes());
				}
				else{
					//pluginResult = new PluginResult(PluginResult.Status.ERROR,"Dispositivo invalido: "+impresion.optString("impresoraEnUso"));
					//return pluginResult;
					CallbackContext.error("Dispositivo invalido: "+impresion.optString("impresoraEnUso"));
					return;
				}
				
				
			} else if (impresion.optString("tipoBoucher").equals("RECIBO")) {
				
				if(impresion.optString("impresoraEnUso").equals("APEX3")){
					PlantillaRecibo prReciboPago = new PlantillaRecibo();
					prReciboPago.setTipoImpresion(impresion.optString("tipoImpresion"));
					prReciboPago.setTituloRecibo(impresion.optString("tituloRecibo"));
					prReciboPago.setReciboNumero(impresion.optString("reciboNumero"));
					prReciboPago.setCodigoCliente(impresion.optString("codigoCliente"));
					prReciboPago.setCliente(impresion.optString("cliente"));
					prReciboPago.setRuta(impresion.optString("ruta"));
					prReciboPago.setFechaRecibo(impresion.optString("fechaRecibo"));
					prReciboPago.setHora(impresion.optString("hora"));
					prReciboPago.setFacturaNumero(impresion.optString("facturaNumero"));
					prReciboPago.setFechaFactura(impresion.optString("fechaFactura"));
					prReciboPago.setMontoOriginal(impresion.optString("montoOriginal"));
					prReciboPago.setSaldo(impresion.optString("saldo"));
					prReciboPago.setAbono(impresion.optString("abono"));
					prReciboPago.setNuevoSaldo(impresion.optString("nuevoSaldo"));
					prReciboPago.setDatosLineas(impresion.optJSONArray("detalleRecibo"));
					
					//prReciboPago.setCopias(Integer.parseInt(impresion.optString("copias")));
					
					//setBuffer(prReciboPago.getReciboPago().getBytes());
					prReciboPago.setCopias(Integer.parseInt(impresion.optString("copias")));
					setBuffer(prReciboPago.getReciboPago().getBytes());
					outputStream.write(getBuffer());

					if(impresion.optString("tipoImpresion").equals("ORIGINAL")){
						//Imprime copias...
						imprimirCopiasR(1,prReciboPago,SOCKET_BLUETOOTH);
					}

					//pluginResult = new PluginResult(PluginResult.Status.OK);
					//return pluginResult;
					CallbackContext.success("OK");
					return;
				}
				else if(impresion.optString("impresoraEnUso").equals("SPP-R300")){
					PlantillaReciboWifi prReciboPago = new PlantillaReciboWifi();
					prReciboPago.setTipoImpresion(impresion.optString("tipoImpresion"));
					prReciboPago.setTituloRecibo(impresion.optString("tituloRecibo"));
					prReciboPago.setReciboNumero(impresion.optString("reciboNumero"));
					prReciboPago.setCodigoCliente(impresion.optString("codigoCliente"));
					prReciboPago.setCliente(impresion.optString("cliente"));
					prReciboPago.setRuta(impresion.optString("ruta"));
					prReciboPago.setFechaRecibo(impresion.optString("fechaRecibo"));
					prReciboPago.setHora(impresion.optString("hora"));
					prReciboPago.setFacturaNumero(impresion.optString("facturaNumero"));
					prReciboPago.setFechaFactura(impresion.optString("fechaFactura"));
					prReciboPago.setMontoOriginal(impresion.optString("montoOriginal"));
					prReciboPago.setSaldo(impresion.optString("saldo"));
					prReciboPago.setAbono(impresion.optString("abono"));
					prReciboPago.setNuevoSaldo(impresion.optString("nuevoSaldo"));
					prReciboPago.setDatosLineas(impresion.optJSONArray("detalleRecibo"));
					
					//prReciboPago.setCopias(Integer.parseInt(impresion.optString("copias")));
					
					//setBuffer(prReciboPago.getReciboPago().getBytes());
					
					//Imprime recibo original...
					prReciboPago.setCopias(Integer.parseInt(impresion.optString("copias")));
					setBuffer(prReciboPago.getReciboPago().getBytes());
					outputStream.write(getBuffer());

					if(impresion.optString("tipoImpresion").equals("ORIGINAL")){
						//Imprime copias...
						imprimirCopiasR(1,prReciboPago,SOCKET_BLUETOOTH);
					}

					//pluginResult = new PluginResult(PluginResult.Status.OK);
					//return pluginResult;
					CallbackContext.success("OK");
					return;
				}
				else{
					//pluginResult = new PluginResult(PluginResult.Status.ERROR,"Dispositivo invalido: "+impresion.optString("impresoraEnUso"));
					//return pluginResult;
					CallbackContext.error("Dispositivo invalido: "+impresion.optString("impresoraEnUso"));
					return;
				}
				
			} else if (impresion.optString("tipoBoucher").equals("RECIBO_ENVASES")) {
				
				if(impresion.optString("impresoraEnUso").equals("APEX3")){
					PlantillaRecibo prReciboPagoEnvase = new PlantillaRecibo();
					
					prReciboPagoEnvase.setTipoImpresion(impresion.optString("tipoImpresion"));
					prReciboPagoEnvase.setTituloRecibo(impresion.optString("tituloRecibo"));
					prReciboPagoEnvase.setReciboNumero(impresion.optString("reciboNumero"));
					prReciboPagoEnvase.setCodigoCliente(impresion.optString("codigoCliente"));
					prReciboPagoEnvase.setCliente(impresion.optString("cliente"));
					prReciboPagoEnvase.setRuta(impresion.optString("ruta"));
					prReciboPagoEnvase.setFechaRecibo(impresion.optString("fechaRecibo"));
					prReciboPagoEnvase.setHora(impresion.optString("hora"));
					prReciboPagoEnvase.setSaldo(impresion.optString("saldo"));
					prReciboPagoEnvase.setDatosLineas(impresion.optJSONArray("detalleRecibo"));
					
					prReciboPagoEnvase.setCopias(Integer.parseInt(impresion.optString("copias")));
					
					setBuffer(prReciboPagoEnvase.getReciboPagoEnvases().getBytes());
				}
				else if(impresion.optString("impresoraEnUso").equals("SPP-R300")){
					PlantillaReciboWifi prReciboPagoEnvase = new PlantillaReciboWifi();
					
					prReciboPagoEnvase.setTipoImpresion(impresion.optString("tipoImpresion"));
					prReciboPagoEnvase.setTituloRecibo(impresion.optString("tituloRecibo"));
					prReciboPagoEnvase.setReciboNumero(impresion.optString("reciboNumero"));
					prReciboPagoEnvase.setCodigoCliente(impresion.optString("codigoCliente"));
					prReciboPagoEnvase.setCliente(impresion.optString("cliente"));
					prReciboPagoEnvase.setRuta(impresion.optString("ruta"));
					prReciboPagoEnvase.setFechaRecibo(impresion.optString("fechaRecibo"));
					prReciboPagoEnvase.setHora(impresion.optString("hora"));
					prReciboPagoEnvase.setSaldo(impresion.optString("saldo"));
					prReciboPagoEnvase.setDatosLineas(impresion.optJSONArray("detalleRecibo"));
					
					prReciboPagoEnvase.setCopias(Integer.parseInt(impresion.optString("copias")));
					
					setBuffer(prReciboPagoEnvase.getReciboPagoEnvases().getBytes());
				}
				else{
					//pluginResult = new PluginResult(PluginResult.Status.ERROR,"Dispositivo invalido: "+impresion.optString("impresoraEnUso"));
					//return pluginResult;
					CallbackContext.error("Dispositivo invalido: "+impresion.optString("impresoraEnUso"));
					return;
				}
			}
			
			outputStream.write(getBuffer());

			//pluginResult = new PluginResult(PluginResult.Status.OK);
			CallbackContext.success("OK");

		} catch (Exception e) {
			logErr(e.toString() + " / " + e.getMessage() + " | Escritura");
			
			//pluginResult = new PluginResult(PluginResult.Status.IO_EXCEPTION, e.getMessage() + " | Escritura");
			CallbackContext.error(e.getMessage());
		}
		//return pluginResult;
		return;
	}
	
	// helper log functions
		private void logDbg(String msg) {
			Log.d("BluetoothPlugin", msg);
		}

		private void logErr(String msg) {
			Log.e("BluetoothPlugin", msg);
		}
		
		private byte[] getBuffer() {
			return this.buffer;
		}
		
		private void setBuffer(byte[] byt) {
			this.buffer = byt;
		}

	/**
	 * Receives activity results
	 */
	@Override
	public void onActivityResult(int requestCode, int resultCode, Intent intent) {
		if( requestCode == 1 ) {
			m_stateChanging = false;
		}
	}

	/**
	 * Helper class for handling all bluetooth based events
	 */
	private class BPBroadcastReceiver extends BroadcastReceiver {
		@Override
		public void onReceive(Context context, Intent intent) {
			String action = intent.getAction();
			
			//Log.d( "BluetoothPlugin", "Action: " + action );

			// Check if we found a new device
			if (BluetoothDevice.ACTION_FOUND.equals(action)) {
				BluetoothDevice bluetoothDevice = intent
						.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE);

				try {
					JSONObject deviceInfo = new JSONObject();
					deviceInfo.put("name", bluetoothDevice.getName());
					deviceInfo.put("address", bluetoothDevice.getAddress());
					
					m_discoveredDevices.put(deviceInfo);
				} catch (JSONException e) {
					Log.e("BluetoothPlugin", e.getMessage());
				}
			}
			// Check if we finished discovering devices
			else if (BluetoothAdapter.ACTION_DISCOVERY_FINISHED.equals(action)) {
				m_discovering = false;
			}
			// Check if we found UUIDs
			else if(BluetoothPlugin.ACTION_UUID.equals(action)) {
				m_gotUUIDs = new JSONArray();
				
				Parcelable[] parcelUuids = intent.getParcelableArrayExtra(BluetoothPlugin.EXTRA_UUID);
				if( parcelUuids != null ) {
					Log.d("BluetoothPlugin", "Found UUIDs: " + parcelUuids.length);
	
					// Sort UUIDs into JSON array and return it
					for( int i = 0; i < parcelUuids.length; i++ ) {
						m_gotUUIDs.put( parcelUuids[i].toString() );
					}
	
					m_gettingUuids = false;
				}
			}
		}
	};
}

