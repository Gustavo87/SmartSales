package PlantillasSPPR300;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.util.Log;

public class PlantillaReciboWifi {

	private String tipoImpresion = "N/D", tituloRecibo = "N/D", reciboNumero = "N/D", codigoCliente = "N/D", cliente = "N/D",
			ruta = "N/D", fechaRecibo = "N/D", hora = "N/D", tipoPago = "N/D", facturaNumero = "N/D",
			fechaFactura = "N/D", montoOriginal = "N/D", saldo = "N/D", abono = "N/D", nuevoSaldo = "N/D";
	
	private int numeroCopia;
	
	private final String AFC = "AFC DGI ASFC/07/0009/12/2011/5";
	
	private int copias = 1;
	
	private JSONArray datosLineas = null;
	
	private StringBuilder reciboPago;

	public PlantillaReciboWifi() {

	}
	
	public void setnumeroCopia (int numeroCopia){
		this.numeroCopia= numeroCopia;
		
	}
	
	public void setTipoImpresion(String tipoImpresion) {
		this.tipoImpresion = tipoImpresion;
	}

	public void setTituloRecibo(String tituloRecibo) {
		this.tituloRecibo = tituloRecibo;
	}

	public void setReciboNumero(String reciboNumero) {
		this.reciboNumero = reciboNumero;
	}

	public void setCodigoCliente(String codigoCliente) {
		this.codigoCliente = codigoCliente;
	}

	public void setCliente(String cliente) {
		this.cliente = cliente;
	}

	public void setRuta(String ruta) {
		this.ruta = ruta;
	}

	public void setFechaRecibo(String fechaRecibo) {
		this.fechaRecibo = fechaRecibo;
	}

	public void setHora(String hora) {
		this.hora = hora;
	}

	public void setTipoPago(String tipoPago) {
		this.tipoPago = tipoPago;
	}

	public void setFacturaNumero(String facturaNumero) {
		this.facturaNumero = facturaNumero;
	}

	public void setFechaFactura(String fechaFactura) {
		this.fechaFactura = fechaFactura;
	}

	public void setMontoOriginal(String montoOriginal) {
		this.montoOriginal = montoOriginal;
	}

	public void setSaldo(String saldo) {
		this.saldo = saldo;
	}

	public void setAbono(String abono) {
		this.abono = abono;
	}

	public void setNuevoSaldo(String nuevoSaldo) {
		this.nuevoSaldo = nuevoSaldo;
	}

	public void setDatosLineas(JSONArray datosLineas) {
		this.datosLineas = datosLineas;
	}

	public void setCopias(int copias) {
		this.copias = copias;
	}

	
	
	
/*	
	public String getReciboPago() {
		reciboPago = new StringBuilder();
		
		if (tipoImpresion.equals("ORIGINAL")) {
			
			reciboPago.append(construirRecibo(tipoImpresion, false, 0));
			
			for(int i = 1; i <= this.copias; i++) {
				reciboPago.append(construirRecibo("COPIA", true, i));
				
			}
			
			
		} else if (tipoImpresion.equals("COPIA")) {
			for(int i = 1; i <= copias; i++) {
				reciboPago.append(construirRecibo("COPIA", true, i));
				
				
			}
		}
		
		Log.i("RECIBOS", reciboPago.toString());

		return reciboPago.toString();
	}
*/
	public String getReciboPago() {
		reciboPago = new StringBuilder();
		
		if (tipoImpresion.equals("ORIGINAL")) {
			
			reciboPago.append(construirRecibo(tipoImpresion, false, 0));
			
		} else if (tipoImpresion.equals("COPIA")) {
			for(int i = 1; i <= copias; i++) {
				reciboPago.append(construirRecibo("COPIA", true, i));
				
				
			}
		}
		else if (tipoImpresion.equals("RECIBOCOPIA")) {
			reciboPago.append(construirRecibo("COPIA", true, numeroCopia));	
		}
		
		Log.i("RECIBOS", reciboPago.toString());

		return reciboPago.toString();
	}
	/**
	 * 
	 * @param tipo
	 * @param isCopia
	 * @param copia
	 * @return
	 */
	private String construirRecibo(String tipo, boolean isCopia, int copia){
		StringBuilder reciboObj = new StringBuilder(); 
		
		reciboObj.append("\n");
		reciboObj.append(ManejoTextoWifi.centrarTexto("Compania Licorera de Nicaragua, S.A.")+"\n");
		reciboObj.append(ManejoTextoWifi.centrarTexto("Centro Pellas 8vo piso, Km 4.5 Carretera Masaya")+"\n");
		reciboObj.append(ManejoTextoWifi.centrarTexto("Servicio al Consumidor 1-800-3636")+"\n");
		reciboObj.append(ManejoTextoWifi.centrarTexto("RUC # J0310000002096")+"\n");
		reciboObj.append(ManejoTextoWifi.centrarTexto(AFC)+"\n\n");
		
		reciboObj.append(ManejoTextoWifi.centrarTexto(tituloRecibo + " # " + reciboNumero) +"\n\n");
		
		if(isCopia)
		{
			reciboObj.append(ManejoTextoWifi.centrarTexto("-------------COPIA # " + copia + "-------------")+"\n\n");
		}else{
			
			reciboObj.append(ManejoTextoWifi.centrarTexto("-------------"+tipo+"-------------")+"\n\n");
		}
		
		reciboObj.append("Fecha    : " + ManejoTextoWifi.completarEspaciosDer(fechaRecibo,25) + "Hora : "+ hora + "\n");
		reciboObj.append("Codigo   : " + ManejoTextoWifi.completarEspaciosDer(codigoCliente,25) + "Ruta : "+ ruta + "\n");
		reciboObj.append("Cliente  : " + cliente + "\n\n");
		
		reciboObj.append("Factura  : " + ManejoTextoWifi.completarEspaciosDer(facturaNumero,25) + "Fecha: "+ fechaFactura + "\n");
		reciboObj.append("Monto Original  : " + montoOriginal + "\n");
		reciboObj.append("Saldo           : " + saldo + "\n\n");
		
		reciboObj.append("Tipo                  Monto         Banco      Referencia" + "\n\n");
		
		reciboObj.append(this.generarDetalleRecibo());
		reciboObj.append("\nTotal Abono C$  :   " + abono + "\n");
		reciboObj.append("Nuevo Saldo C$  :   " + nuevoSaldo);
		
		reciboObj.append("\n\n\n\n");
		reciboObj.append(ManejoTextoWifi.centrarTexto(" ____________________________")+"\n");
		reciboObj.append(ManejoTextoWifi.centrarTexto("Firma del Cliente")+"\n");
		reciboObj.append("\n\n\n");		
		
	
		return reciboObj.toString();
	}
	
	
	/**
	 * 
	 * @param tipo
	 * @param isCopia
	 * @param copia
	 * @return
	 */
	private String construirReciboEnvases(String tipo, boolean isCopia, int copia){
		StringBuilder reciboObj = new StringBuilder(); 
		
		reciboObj.append("\n");
		reciboObj.append(ManejoTextoWifi.centrarTexto("Compania Licorera de Nicaragua, S.A.")+"\n");
		reciboObj.append(ManejoTextoWifi.centrarTexto("Centro Pellas 8vo piso, Km 4.5 Carretera Masaya")+"\n");
		reciboObj.append(ManejoTextoWifi.centrarTexto("Servicio al Consumidor 1-800-3636")+"\n");
		reciboObj.append(ManejoTextoWifi.centrarTexto("RUC # J0310000002096")+"\n");
		reciboObj.append(ManejoTextoWifi.centrarTexto(AFC)+"\n\n");
		
		reciboObj.append(ManejoTextoWifi.centrarTexto(tituloRecibo + " # " + reciboNumero) +"\n\n");
		
		if(isCopia)
		{
			reciboObj.append(ManejoTextoWifi.centrarTexto("-------------COPIA # " + copia + "-------------")+"\n\n");
		}else{
			
			reciboObj.append(ManejoTextoWifi.centrarTexto("-------------"+tipo+"-------------")+"\n\n");
		}
		
		reciboObj.append("Fecha    : " + ManejoTextoWifi.completarEspaciosDer(fechaRecibo,20) + "Hora : "+ hora + "\n");
		reciboObj.append("Codigo   : " + ManejoTextoWifi.completarEspaciosDer(codigoCliente,20) + "Ruta : "+ ruta + "\n");
		reciboObj.append("Cliente  : " + cliente + "\n\n");
		
		reciboObj.append("Presentacion                       Cantidad");
		
		
		reciboObj.append(this.generarDetalleReciboEnvases());
		reciboObj.append("\nTotal  C$  :   " + saldo + "\n");
		
		reciboObj.append("\n\n\n\n");
		reciboObj.append(ManejoTextoWifi.centrarTexto(" ____________________________")+"\n");
		reciboObj.append(ManejoTextoWifi.centrarTexto("Firma del Cliente")+"\n");
		reciboObj.append("\n\n\n");		
		
	
		return reciboObj.toString();
	}
	
	public String getReciboPagoEnvases() {
		reciboPago = new StringBuilder();
		
		if (tipoImpresion.equals("ORIGINAL")) {
			reciboPago.append(construirReciboEnvases(tipoImpresion, false, 0));
			
			/*
			for(int i = 1; i <= this.copias; i++) {
				reciboPago.append(construirReciboEnvases("COPIA", true, i));
				
			}*/
			
		} else if (tipoImpresion.equals("COPIA")) {
			for(int i = 1; i <= copias; i++) {
				reciboPago.append(construirReciboEnvases("COPIA", true, i));
								
			}
		}else if (tipoImpresion.equals("RECIBOCOPIA")) {
		      reciboPago.append(construirReciboEnvases("COPIA", true, numeroCopia));  
		}
		
		Log.i("RECIBOS", reciboPago.toString());

		return reciboPago.toString();
	}
	
	public String generarDetalleRecibo() {
		StringBuilder strBdetalleInventario = new StringBuilder();
		JSONObject jsonObj = null;
		String tipo = "", tipoTemp, tipoCambio = "", monto, banco, referencia;
		String datTipo[] = null;
		boolean hayDatos = false;

		if (this.datosLineas != null) {
			for (int i = 0; i < datosLineas.length(); i++){
				jsonObj = datosLineas.optJSONObject(i);
				
				tipoTemp = jsonObj.optString("tipo");
				
				try {
					hayDatos = true;
					
					Log.i("PLANTILLA_RECIBO", "Hay varios datos en tipo");
					datTipo = tipoTemp.split("\n");
					
					tipo = datTipo[0];
					tipoCambio = datTipo[1];
				} catch (Exception e) {
					hayDatos = false;
					Log.i("PLANTILLA_RECIBO", "No hay datos de tipo");
				}
				
				monto = jsonObj.optString("monto");
				banco = jsonObj.optString("banco");
				referencia = jsonObj.optString("referencia");

				if (tipo != "null" && monto != "null" && banco != "null" && referencia != "null") {
					strBdetalleInventario.append(
							completarEspaciosDer((hayDatos) ? tipo : tipoTemp, 14)
							+ completarEspaciosIzq(monto, 13)
							+ completarEspaciosIzq(banco, 12)
							+ completarEspaciosIzq(referencia, 9)
							+ ((hayDatos) ? "\n" + tipoCambio + "\n" : "\n")
						);
				}
			}
			return strBdetalleInventario.toString();
		} else {
			return "             DETALLE DE MONTOS N/D\n";
		}
	}
	
	public String generarDetalleReciboEnvases() {
		StringBuilder strBdetalleInventario = new StringBuilder();
		String clientes = "";

		if (this.datosLineas != null) {
			try {
				strBdetalleInventario.append(
					//centrarTexto(clientes) + "\n\n"
					//+ "U1Presentacion                                       CANTU0"
					"\nPresentacion FDC"
					+ "\n"
					+ completarEspaciosDer("Envases  200ml:", 29) + completarEspaciosIzq(datosLineas.getString(0), 7) + "\n"
					+ completarEspaciosDer("Envases  375ml:", 29) + completarEspaciosIzq(datosLineas.getString(1), 7) + "\n"
					+ completarEspaciosDer("Envases  750ml:", 29) + completarEspaciosIzq(datosLineas.getString(2), 7) + "\n"
					+ completarEspaciosDer("Envases 1000ml:", 29) + completarEspaciosIzq(datosLineas.getString(3), 7) + "\n"
					+ completarEspaciosDer("Envases 1750ml:", 29) + completarEspaciosIzq(datosLineas.getString(4), 7)
					+ "\n\n"
					+ "Presentacion RP"
					+ "\n"
					+ completarEspaciosDer("Envases  200ml:", 29) + completarEspaciosIzq(datosLineas.getString(5), 7) + "\n"
					+ completarEspaciosDer("Envases  375ml:", 29) + completarEspaciosIzq(datosLineas.getString(6), 7) + "\n"
					+ completarEspaciosDer("Envases  750ml:", 29) + completarEspaciosIzq(datosLineas.getString(7), 7) + "\n"
					+ completarEspaciosDer("Envases 1000ml:", 29) + completarEspaciosIzq(datosLineas.getString(8), 7) + "\n"
					+ completarEspaciosDer("Envases 1750ml:", 29) + completarEspaciosIzq(datosLineas.getString(9), 7) + "\n"
				);
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			/*for (int i = 0; i < datosLineas.length(); i++){
				jsonObj = datosLineas.optJSONObject(i);
				
				codigoProducto = jsonObj.optString("codigoProducto");
				producto = jsonObj.optString("producto");
				cant = jsonObj.optString("cant");
				nombreProd = codigoProducto + " " + producto;

				if (codigoProducto != "null" && producto != "null" && cant != "null") {
					strBdetalleInventario.append(
							completarEspaciosDer(nombreProd, 47)
							+ completarEspaciosIzq(cant, 8)
						);
				}
			}*/
			return strBdetalleInventario.toString();
		} else {
			return "             DETALLE DE MONTOS N/D\n";
		}
	}
	
	private String centrarTexto(String item) {
		int tamanioCadena = item.length();
		int diferencia = 55 - tamanioCadena;
		int centrar = Math.round(diferencia / 2);
		
		String espacios = " ";
		
		for (int i = 0; i < centrar; i++) {
			espacios += " ";
		}
		
		espacios += item;
		
		return espacios;
	}
	
	private String completarEspaciosDer(String item, int espacios) {
		String itemN = item;
		String post = ".";

		if (item.length() < espacios) {
			for (int i = 0; i < espacios - item.length(); i++) {
				post += " ";
			}

			itemN = itemN + post.substring(1);
		}

		return itemN;
	}
	
	private String completarEspaciosIzq(String item, int espacios) {
		String itemN = item;
		String pre = ".";

		if (item.length() < espacios) {
			for (int i = 0; i < espacios - item.length(); i++) {
				pre += " ";
			}

			itemN = pre.substring(1) + itemN;
		}

		return itemN;
	}
	
}