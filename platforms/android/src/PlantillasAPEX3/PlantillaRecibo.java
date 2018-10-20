package PlantillasAPEX3;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.util.Log;

public class PlantillaRecibo {

	private String tipoImpresion = "N/D", tituloRecibo = "N/D", reciboNumero = "N/D", codigoCliente = "N/D", cliente = "N/D",
			ruta = "N/D", fechaRecibo = "N/D", hora = "N/D", tipoPago = "N/D", facturaNumero = "N/D",
			fechaFactura = "N/D", montoOriginal = "N/D", saldo = "N/D", abono = "N/D", nuevoSaldo = "N/D";
	
	private int numeroCopia;
	
	private int copias = 1;
	
	private JSONArray datosLineas = null;
	
	private StringBuilder reciboPago;

	public PlantillaRecibo() {

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

	public String getReciboPago() {
		reciboPago = new StringBuilder();
		
		if (tipoImpresion.equals("ORIGINAL")) {
			reciboPago.append("J4");
			reciboPago.append("           Compania Licorera de Nicaragua, S.A.\n");
			reciboPago.append("    Centro Pellas 8vo piso, Km 4.5 Carretera a Masaya\n");
			reciboPago.append("            Servicio al Consumidor 1-800-3636\n");
			reciboPago.append("                   RUC # J0310000002096\n");
			reciboPago.append("J4");
			reciboPago.append("         U1" + tituloRecibo + " #U0 " + reciboNumero);
			reciboPago.append("J4");
			reciboPago.append("-------------------------ORIGINAL------------------------");
			reciboPago.append("J4");
			reciboPago.append("U1FechaU0     : " + fechaRecibo + "                   U1HoraU0: "+ hora + "\n");
			reciboPago.append("U1CodigoU0    : " + codigoCliente + "                      U1RutaU0: "+ ruta + "\n");
			reciboPago.append("U1ClienteU0   : " + cliente);
			reciboPago.append("J4");
			reciboPago.append("U1Factura #U0 : " + facturaNumero + "         U1FechaU0: " + fechaFactura + "\n");
			reciboPago.append("U1Monto OriginalU0 :   " + montoOriginal + "\n");
			reciboPago.append("U1SaldoU0          :   " + saldo);
			reciboPago.append("J4");
			reciboPago.append("U1Tipo                 Monto       Banco   ReferenciaU0");
			reciboPago.append("J4");
			reciboPago.append(this.generarDetalleRecibo());
			reciboPago.append("J2U1TotalU0");
			reciboPago.append(" U1Abono C$U0    :   " + abono + "\n");
			reciboPago.append("U1Nuevo Saldo C$U0    :   " + nuevoSaldo);
			reciboPago.append("J8 J8");
			reciboPago.append("               ____________________________\n");
			reciboPago.append("                   Firma del Cliente");
			reciboPago.append("J8 J8 J8 J8");
			/*
			for(int i = 1; i <= this.copias; i++) {
				reciboPago.append("J8 J8");
				reciboPago.append("J4");
				reciboPago.append("           Compania Licorera de Nicaragua, S.A.\n");
				reciboPago.append("    Centro Pellas 8vo piso, Km 4.5 Carretera a Masaya\n");
				reciboPago.append("            Servicio al Consumidor 1-800-3636\n");
				reciboPago.append("                   RUC # J0310000002096\n");
				reciboPago.append("J4");
				reciboPago.append("         U1" + tituloRecibo + " #U0 " + reciboNumero);
				reciboPago.append("J4");
				reciboPago.append("------------------------COPIA # " + i + "-----------------------");
				reciboPago.append("J4");
				reciboPago.append("U1FechaU0     : " + fechaRecibo + "                   U1HoraU0: "+ hora + "\n");
				reciboPago.append("U1CodigoU0    : " + codigoCliente + "                      U1RutaU0: "+ ruta + "\n");
				reciboPago.append("U1ClienteU0   : " + cliente);
				reciboPago.append("J4");
				reciboPago.append("U1Factura #U0 : " + facturaNumero + "         U1FechaU0: " + fechaFactura + "\n");
				reciboPago.append("U1Monto OriginalU0 :   " + montoOriginal + "\n");
				reciboPago.append("U1SaldoU0          :   " + saldo);
				reciboPago.append("J4");
				reciboPago.append("U1Tipo                 Monto       Banco   ReferenciaU0");
				reciboPago.append("J4");
				reciboPago.append(this.generarDetalleRecibo());
				reciboPago.append("J2U1TotalU0");
				reciboPago.append(" U1Abono C$U0    :   " + abono + "\n");
				reciboPago.append("U1Nuevo Saldo C$U0    :   " + nuevoSaldo);
				reciboPago.append("J8 J8");
				reciboPago.append("               ____________________________\n");
				reciboPago.append("                   Firma del Cliente");
				reciboPago.append("J8 J8 J8 J8");
			}
			*/
		} else if (tipoImpresion.equals("COPIA")) {
			for(int i = 1; i <= copias; i++) {
				reciboPago.append("J4");
				reciboPago.append("           Compania Licorera de Nicaragua, S.A.\n");
				reciboPago.append("    Centro Pellas 8vo piso, Km 4.5 Carretera a Masaya\n");
				reciboPago.append("            Servicio al Consumidor 1-800-3636\n");
				reciboPago.append("                   RUC # J0310000002096\n");
				reciboPago.append("J4");
				reciboPago.append("         U1" + tituloRecibo + " #U0 " + reciboNumero);
				reciboPago.append("J4");
				reciboPago.append("------------------------COPIA # " + i + "-----------------------");
				reciboPago.append("J4");
				reciboPago.append("U1FechaU0     : " + fechaRecibo + "                   U1HoraU0: "+ hora + "\n");
				reciboPago.append("U1CodigoU0    : " + codigoCliente + "                      U1RutaU0: "+ ruta + "\n");
				reciboPago.append("U1ClienteU0   : " + cliente);
				reciboPago.append("J4");
				reciboPago.append("U1Factura #U0 : " + facturaNumero + "         U1FechaU0: " + fechaFactura + "\n");
				reciboPago.append("U1Monto OriginalU0 :   " + montoOriginal + "\n");
				reciboPago.append("U1SaldoU0          :   " + saldo);
				reciboPago.append("J4");
				reciboPago.append("U1Tipo                 Monto       Banco   ReferenciaU0");
				reciboPago.append("J4");
				reciboPago.append(this.generarDetalleRecibo());
				reciboPago.append("J2U1TotalU0");
				reciboPago.append(" U1AbonoU0    :   " + abono + "\n");
				reciboPago.append("U1Nuevo SaldoU0    :   " + nuevoSaldo);
				reciboPago.append("J8 J8");
				reciboPago.append("               ____________________________\n");
				reciboPago.append("                   Firma del Cliente");
				reciboPago.append("J8 J8 J8 J8");
			}
		}
		else if (tipoImpresion.equals("RECIBOCOPIA")) {
			reciboPago.append("J8 J8");
			reciboPago.append("J4");
			reciboPago.append("           Compania Licorera de Nicaragua, S.A.\n");
			reciboPago.append("    Centro Pellas 8vo piso, Km 4.5 Carretera a Masaya\n");
			reciboPago.append("            Servicio al Consumidor 1-800-3636\n");
			reciboPago.append("                   RUC # J0310000002096\n");
			reciboPago.append("J4");
			reciboPago.append("         U1" + tituloRecibo + " #U0 " + reciboNumero);
			reciboPago.append("J4");
			reciboPago.append("------------------------COPIA # " + numeroCopia + "-----------------------");
			reciboPago.append("J4");
			reciboPago.append("U1FechaU0     : " + fechaRecibo + "                   U1HoraU0: "+ hora + "\n");
			reciboPago.append("U1CodigoU0    : " + codigoCliente + "                      U1RutaU0: "+ ruta + "\n");
			reciboPago.append("U1ClienteU0   : " + cliente);
			reciboPago.append("J4");
			reciboPago.append("U1Factura #U0 : " + facturaNumero + "         U1FechaU0: " + fechaFactura + "\n");
			reciboPago.append("U1Monto OriginalU0 :   " + montoOriginal + "\n");
			reciboPago.append("U1SaldoU0          :   " + saldo);
			reciboPago.append("J4");
			reciboPago.append("U1Tipo                 Monto       Banco   ReferenciaU0");
			reciboPago.append("J4");
			reciboPago.append(this.generarDetalleRecibo());
			reciboPago.append("J2U1TotalU0");
			reciboPago.append(" U1Abono C$U0    :   " + abono + "\n");
			reciboPago.append("U1Nuevo Saldo C$U0    :   " + nuevoSaldo);
			reciboPago.append("J8 J8");
			reciboPago.append("               ____________________________\n");
			reciboPago.append("                   Firma del Cliente");
			reciboPago.append("J8 J8 J8 J8");
			
		}
		Log.i("RECIBOS", reciboPago.toString());

		return reciboPago.toString();
	}

	public String getReciboPagoEnvases() {
		reciboPago = new StringBuilder();
		
		if (tipoImpresion.equals("ORIGINAL")) {
			reciboPago.append("J4");
			reciboPago.append("           Compania Licorera de Nicaragua, S.A.\n");
			reciboPago.append("    Centro Pellas 8vo piso, Km 4.5 Carretera a Masaya\n");
			reciboPago.append("            Servicio al Consumidor 1-800-3636\n");
			reciboPago.append("J4");
			reciboPago.append("         U1" + tituloRecibo + " #U0 " + reciboNumero);
			reciboPago.append("J4");
			reciboPago.append("-------------------------ORIGINAL------------------------");
			reciboPago.append("J4");
			reciboPago.append("U1FechaU0     : " + fechaRecibo + "                   U1HoraU0: "+ hora + "\n");
			reciboPago.append("U1CodigoU0    : " + codigoCliente + "                      U1RutaU0: "+ ruta + "\n");
			reciboPago.append("U1ClienteU0   : " + cliente);
			reciboPago.append("J4");
			reciboPago.append("U1Presentacion                                       CANTU0");
			reciboPago.append("J4");
			reciboPago.append(this.generarDetalleReciboEnvases());
			reciboPago.append("J2U1Total C$ :U0  " + saldo);
			reciboPago.append("J8 J8");
			reciboPago.append("               ____________________________\n");
			reciboPago.append("                   Firma del Cliente");
			reciboPago.append("J8 J8 J8 J8");
			/*
			for(int i = 1; i <= 1; i++) {
				reciboPago.append("J4");
				reciboPago.append("           Compania Licorera de Nicaragua, S.A.\n");
				reciboPago.append("    Centro Pellas 8vo piso, Km 4.5 Carretera a Masaya\n");
				reciboPago.append("            Servicio al Consumidor 1-800-3636\n");
				reciboPago.append("J4");
				reciboPago.append("         U1" + tituloRecibo + " #U0 " + reciboNumero);
				reciboPago.append("J4");
				reciboPago.append("------------------------COPIA # " + i + "-----------------------");
				reciboPago.append("J4");
				reciboPago.append("U1FechaU0     : " + fechaRecibo + "                   U1HoraU0: "+ hora + "\n");
				reciboPago.append("U1CodigoU0    : " + codigoCliente + "                      U1RutaU0: "+ ruta + "\n");
				reciboPago.append("U1ClienteU0   : " + cliente);
				reciboPago.append("J4");
				reciboPago.append("U1Presentacion                                       CANTU0");
				reciboPago.append("J4");
				reciboPago.append(this.generarDetalleReciboEnvases());
				reciboPago.append("J2U1Total C$ :U0  " + saldo);
				reciboPago.append("J8 J8");
				reciboPago.append("               ____________________________\n");
				reciboPago.append("                   Firma del Cliente");
				reciboPago.append("J8 J8 J8 J8");
			}
			*/
		} else if (tipoImpresion.equals("COPIA")) {
			for(int i = 1; i <= copias; i++) {
				reciboPago.append("J4");
				reciboPago.append("           Compania Licorera de Nicaragua, S.A.\n");
				reciboPago.append("    Centro Pellas 8vo piso, Km 4.5 Carretera a Masaya\n");
				reciboPago.append("            Servicio al Consumidor 1-800-3636\n");
				reciboPago.append("J4");
				reciboPago.append("         U1" + tituloRecibo + " #U0 " + reciboNumero);
				reciboPago.append("J4");
				reciboPago.append("------------------------COPIA # " + i + "-----------------------");
				reciboPago.append("J4");
				reciboPago.append("U1FechaU0     : " + fechaRecibo + "                   U1HoraU0: "+ hora + "\n");
				reciboPago.append("U1CodigoU0    : " + codigoCliente + "                      U1RutaU0: "+ ruta + "\n");
				reciboPago.append("U1ClienteU0   : " + cliente);
				reciboPago.append("J4");
				reciboPago.append(this.generarDetalleReciboEnvases());
				reciboPago.append("J4");
				reciboPago.append("J2U1Total C$ :U0  " + saldo);
				reciboPago.append("J8 J8");
				reciboPago.append("               ____________________________\n");
				reciboPago.append("                   Firma del Cliente");
				reciboPago.append("J8 J8 J8 J8");
			}
		}
		else if (tipoImpresion.equals("RECIBOCOPIA")) {
			
			reciboPago.append("J4");
			reciboPago.append("           Compania Licorera de Nicaragua, S.A.\n");
			reciboPago.append("    Centro Pellas 8vo piso, Km 4.5 Carretera a Masaya\n");
			reciboPago.append("            Servicio al Consumidor 1-800-3636\n");
			reciboPago.append("J4");
			reciboPago.append("         U1" + tituloRecibo + " #U0 " + reciboNumero);
			reciboPago.append("J4");
			reciboPago.append("------------------------COPIA # " + numeroCopia + "-----------------------");
			reciboPago.append("J4");
			reciboPago.append("U1FechaU0     : " + fechaRecibo + "                   U1HoraU0: "+ hora + "\n");
			reciboPago.append("U1CodigoU0    : " + codigoCliente + "                      U1RutaU0: "+ ruta + "\n");
			reciboPago.append("U1ClienteU0   : " + cliente);
			reciboPago.append("J4");
			reciboPago.append("U1Presentacion                                       CANTU0");
			reciboPago.append("J4");
			reciboPago.append(this.generarDetalleReciboEnvases());
			reciboPago.append("J2U1Total C$ :U0  " + saldo);
			reciboPago.append("J8 J8");
			reciboPago.append("               ____________________________\n");
			reciboPago.append("                   Firma del Cliente");
			reciboPago.append("J8 J8 J8 J8");

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
							completarEspaciosDer((hayDatos) ? tipo : tipoTemp, 16)
							+ completarEspaciosIzq(monto, 10)
							+ completarEspaciosIzq(banco, 12)
							+ completarEspaciosIzq(referencia, 13)
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
					centrarTexto(clientes) + "\n\n"
					+ "U1Presentacion                                       CANTU0"
					+ "J4"
					+ "Presentacion FDC"
					+ "J4"
					+ completarEspaciosDer("Envases  200ml:", 48) + completarEspaciosIzq(datosLineas.getString(0), 7) + "\n"
					+ completarEspaciosDer("Envases  375ml:", 48) + completarEspaciosIzq(datosLineas.getString(1), 7) + "\n"
					+ completarEspaciosDer("Envases  750ml:", 48) + completarEspaciosIzq(datosLineas.getString(2), 7) + "\n"
					+ completarEspaciosDer("Envases 1000ml:", 48) + completarEspaciosIzq(datosLineas.getString(3), 7) + "\n"
					+ completarEspaciosDer("Envases 1750ml:", 48) + completarEspaciosIzq(datosLineas.getString(4), 7)
					+ "J4"
					+ "Presentacion RP"
					+ "J4"
					+ completarEspaciosDer("Envases  200ml:", 48) + completarEspaciosIzq(datosLineas.getString(5), 7) + "\n"
					+ completarEspaciosDer("Envases  375ml:", 48) + completarEspaciosIzq(datosLineas.getString(6), 7) + "\n"
					+ completarEspaciosDer("Envases  750ml:", 48) + completarEspaciosIzq(datosLineas.getString(7), 7) + "\n"
					+ completarEspaciosDer("Envases 1000ml:", 48) + completarEspaciosIzq(datosLineas.getString(8), 7) + "\n"
					+ completarEspaciosDer("Envases 1750ml:", 48) + completarEspaciosIzq(datosLineas.getString(9), 7) + "\n"
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