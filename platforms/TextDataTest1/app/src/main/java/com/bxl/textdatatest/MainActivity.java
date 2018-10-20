package com.bxl.textdatatest;

import java.util.ArrayList;
import java.util.Set;
import java.util.logging.Handler;
import java.util.logging.LogRecord;

import com.bxl.config.editor.BXLConfigLoader;

import android.app.Activity;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.content.Intent;
import android.os.Bundle;
import android.os.SystemClock;
import android.provider.Settings;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.AdapterView;
import android.widget.AdapterView.OnItemClickListener;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;
import jpos.JposException;
import jpos.POSPrinter;
import jpos.POSPrinterConst;
import jpos.config.JposEntry;
import jpos.events.DirectIOEvent;
import jpos.events.DirectIOListener;
import jpos.events.ErrorEvent;
import jpos.events.ErrorListener;
import jpos.events.OutputCompleteEvent;
import jpos.events.OutputCompleteListener;
import jpos.events.StatusUpdateEvent;
import jpos.events.StatusUpdateListener;

public class MainActivity extends Activity
		implements OnItemClickListener, OnClickListener {

	private static final int REQUEST_CODE_BLUETOOTH = 1;

	private static final String DEVICE_ADDRESS_START = "(";
	private static final String DEVICE_ADDRESS_END = ")";

	private EditText dataEditText;
	private Spinner escapeSequencesSpinner;

	private final ArrayList<CharSequence> bondedDevices = new ArrayList<>();
	private ArrayAdapter<CharSequence> arrayAdapter;

	private BXLConfigLoader bxlConfigLoader;
	private POSPrinter posPrinter;
	private String logicalName;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);

		setBondedDevices();

		arrayAdapter = new ArrayAdapter<>(this,
				android.R.layout.simple_list_item_single_choice, bondedDevices);
		ListView listView = (ListView) findViewById(R.id.listViewPairedDevices);
		listView.setAdapter(arrayAdapter);

		listView.setChoiceMode(ListView.CHOICE_MODE_SINGLE);
		listView.setOnItemClickListener(this);

		dataEditText = (EditText) findViewById(R.id.editTextData);
		dataEditText.setSelection(dataEditText.getText().length());

		escapeSequencesSpinner = (Spinner) findViewById(R.id.spinnerEscapeSequences);

		findViewById(R.id.buttonAdd).setOnClickListener(this);
		findViewById(R.id.buttonPrint).setOnClickListener(this);

		bxlConfigLoader = new BXLConfigLoader(this);
		try {
			bxlConfigLoader.openFile();
		} catch (Exception e) {
			e.printStackTrace();
			bxlConfigLoader.newFile();
		}
		posPrinter = new  POSPrinter(this);

		try {
			posPrinter.setAsyncMode(false);
		} catch (JposException e) {
			e.printStackTrace();
		}



		posPrinter.addStatusUpdateListener(new StatusUpdateListener() {
			@Override
			public void statusUpdateOccurred(StatusUpdateEvent statusUpdateEvent) {
				if(statusUpdateEvent.getStatus() == 2004){
					try {
						//Return de mensaje.
						posPrinter.close();
					} catch (JposException e) {
						e.printStackTrace();
					}
				}
			}
		});

//		Button btnEstado =(Button) findViewById(R.id.btnEstado);
//		btnEstado.setOnClickListener(new OnClickListener() {
//			@Override
//			public void onClick(View v) {
//				try {
//					Log.d("Estado Impresora ","Estado Impresora " + posPrinter.getPowerState());
//				} catch (JposException e) {
//					e.printStackTrace();
//				}
//			}
//		});
	}

	@Override
	protected void onDestroy() {
		super.onDestroy();

		try {
			posPrinter.close();
		} catch (JposException e) {
			e.printStackTrace();
		}
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		getMenuInflater().inflate(R.menu.main, menu);
		return true;
	}

	@Override
	public boolean onOptionsItemSelected(MenuItem item) {
		int id = item.getItemId();
		if (id == R.id.action_settings) {
			Intent intent = new Intent(Settings.ACTION_BLUETOOTH_SETTINGS);
			startActivityForResult(intent, REQUEST_CODE_BLUETOOTH);
			return true;
		}
		return super.onOptionsItemSelected(item);
	}

	@Override
	protected void onActivityResult(int requestCode, int resultCode, Intent data) {
		if (requestCode == REQUEST_CODE_BLUETOOTH) {
			setBondedDevices();
		}
	}

	@Override
	public void onItemClick(AdapterView<?> parent, View view, int position,
							long id) {
		String device = ((TextView) view).getText().toString();

		String name = device.substring(0, device.indexOf(DEVICE_ADDRESS_START));

		String address = device.substring(device.indexOf(DEVICE_ADDRESS_START)
						+ DEVICE_ADDRESS_START.length(),
				device.indexOf(DEVICE_ADDRESS_END));

		try {
			for (Object entry : bxlConfigLoader.getEntries()) {
				JposEntry jposEntry = (JposEntry) entry;
				bxlConfigLoader.removeEntry(jposEntry.getLogicalName());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		try {
			logicalName = setProductName(name);
			bxlConfigLoader.addEntry(logicalName,
					BXLConfigLoader.DEVICE_CATEGORY_POS_PRINTER,
					logicalName,
					BXLConfigLoader.DEVICE_BUS_BLUETOOTH, address);

			bxlConfigLoader.saveFile();
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	private String setProductName(String name){
		String productName = BXLConfigLoader.PRODUCT_NAME_SPP_R200II;

		if((name.indexOf("SPP-R200II")>=0)){
			if(name.length() > 10){
				if(name.substring(10, 11).equals("I")){
					productName = BXLConfigLoader.PRODUCT_NAME_SPP_R200III;
				}
			}
		}else if((name.indexOf("SPP-R210")>=0)){
			productName = BXLConfigLoader.PRODUCT_NAME_SPP_R210;
		}else if((name.indexOf("SPP-R310")>=0)){
			productName = BXLConfigLoader.PRODUCT_NAME_SPP_R310;
		}else if((name.indexOf("SPP-R300")>=0)){
			productName = BXLConfigLoader.PRODUCT_NAME_SPP_R300;
		}else if((name.indexOf("SPP-R400")>=0)){
			productName = BXLConfigLoader.PRODUCT_NAME_SPP_R400;
		}

		return productName;
	}

	@Override
	public void onClick(View v) {
		switch (v.getId()) {
			case R.id.buttonAdd:

				String text = EscapeSequence.getString(escapeSequencesSpinner.getSelectedItemPosition());
				dataEditText.getText().insert(dataEditText.getSelectionStart(), text);
				break;

			case R.id.buttonPrint:

				print();
				break;
		}
	}

	private void setBondedDevices() {
		logicalName = null;
		bondedDevices.clear();

		BluetoothAdapter bluetoothAdapter = BluetoothAdapter
				.getDefaultAdapter();
		Set<BluetoothDevice> bondedDeviceSet = bluetoothAdapter
				.getBondedDevices();

		for (BluetoothDevice device : bondedDeviceSet) {
			bondedDevices.add(device.getName() + "("
					+ device.getAddress() + ")");
		}

	}

	private void print() {

		String data = dataEditText.getText().toString();
		try {

			if(posPrinter.getState() == 2){
				posPrinter.close();
			}
			posPrinter.open(logicalName);
			posPrinter.claim(0);
			posPrinter.setDeviceEnabled(true);

			double tiempoImpresion = 0.0;
			tiempoImpresion = (data.length()/64.0) / 8.0;
			Long tiempoEspera = ((Long.valueOf(Math.round(Math.ceil(tiempoImpresion)))) * 1000);
			posPrinter.printRawData(data + "\n");

//			new android.os.Handler().postDelayed(new Runnable() {
//				@Override
//				public void run() {
//					try {
//						if(posPrinter.getState() == 2){
//							Toast.makeText(getApplicationContext(), "Impresion Terminada.", Toast.LENGTH_LONG).show();
//							posPrinter.close();
//						}
//						else{
//							Toast.makeText(getApplicationContext(), "Ocurrio un error durante la impresion.", Toast.LENGTH_LONG).show();
//							posPrinter.close();
//						}
//
//					} catch (JposException e) {
//						Toast.makeText(getApplicationContext(), "Ocurrio un error durante la impresion.", Toast.LENGTH_LONG).show();
//						e.printStackTrace();
//					}
//				}
//			},tiempoEspera);
			SystemClock.sleep(tiempoEspera);
			try {
				if(posPrinter.getState() == 2 ){
					Log.d("Estado Impresora","Exito Impresora... " + posPrinter.getState() );
					posPrinter.close();
//					callbackContext.success("Exito!!!!");
//                callbackContext.error("Ocurrio un error en la impresión");
				}
				else{
					Log.d("Estado Impresora","Error Impresora... " + posPrinter.getState() );
					posPrinter.close();
//					callbackContext.error("Ocurrio un error en la impresión");
				}

			} catch (JposException e) {
				Log.d("Estado Impresora","Error Impresora... " );
				e.printStackTrace();
//				callbackContext.error("Ocurrio un error en la impresión");
			}

		} catch (JposException e) {
			e.printStackTrace();
//			callbackContext.error("Ocurrio un error en la impresión");

		}

//		} catch (JposException e) {
//			e.printStackTrace();
//			Toast.makeText(this, e.getMessage(), Toast.LENGTH_SHORT).show();
//		}

	}



}


