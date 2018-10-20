package PlantillasSPPR300;

import org.json.JSONArray;
import org.json.JSONObject;

import android.util.Log;

/**
 * 
 * @author cgarcia
 */
public class PlantillaFacturaWifi {

	private String tipoImpresion = "N/D", titulo = "N/D", codigo = "N/D    ", ruta = "N/D", cliente = "N/D",
			factNum = "N/D", codFactura = "N/D", fecha = "dd/mm/aa", fechaFact = "dd/mm/aa", hora = "N/D",
			pedido = "N/D", tipoFactura = "N/D", subtotal = "N/D", iva = "N/D",
			total = "N/D", montoOriginal = "N/D", saldo = "N/D",facturaManual="N/D", porcentajeCentralizacion="";
			
	private int numeroCopia;

	public String getPorcentajeCentralizacion() {
		return porcentajeCentralizacion;
	}

	public void setPorcentajeCentralizacion(String porcentajeCentralizacion) {
		this.porcentajeCentralizacion = porcentajeCentralizacion;
	}

	private String rucCliente = "N/D";
	
	private final String AFC = "AFC DGI ASFC/07/0009/12/2011/5";
	
	private int copias = 1;
	
	private JSONArray datosLineas = null;
	
	private StringBuilder factura;
	private StringBuilder facturaCambio;
	private StringBuilder facturaDevolucion;

	public PlantillaFacturaWifi() {
	}

	
	/**
	 * Retorna la Factura
	 * @return
	 */
	public String getFactura() {
		factura = new StringBuilder();
		
		//FACTURA ORIGINAL MAS  COPIAS
//		if (tipoImpresion.equals("ORIGINAL") && copias == 0) {
			
			factura.append(construirFacturas(tipoImpresion,false, 0));
			
			//REIMPRESION CON CANTIDAD DE COPIAS
//		} else if (tipoImpresion.equals("REIMPRESION") && copias > 0) {
//			for(int i = 1; i <= copias; i++) {
//				factura.append(construirFacturas(tipoImpresion,false, i));
//			}
//			//COPIAS
//		} else if (tipoImpresion.equals("COPIA")) {
//			for(int i = 1; i <= copias; i++) {
//				factura.append(construirFacturas(tipoImpresion,false, i));
//			}
//		}
//		else if (tipoImpresion.equals("FACTURACOPIA")) {
//			factura.append(construirFacturas("copia",true, numeroCopia));
//		}

		return factura.toString();
	}
	/*
	public String getFactura() {
		factura = new StringBuilder();
		
		//FACTURA ORIGINAL MAS  COPIAS
		if (tipoImpresion.equals("ORIGINAL") && copias == 0) {
			
			factura.append(construirFacturas(tipoImpresion,false, 0));
			
			//DOS COPIAS
			for(int i = 1; i <= 2; i++) {
				factura.append(construirFacturas("copia",true, i));								
			}
		
			//REIMPRESION CON CANTIDAD DE COPIAS
		} else if (tipoImpresion.equals("REIMPRESION") && copias > 0) {
			for(int i = 1; i <= copias; i++) {
				factura.append(construirFacturas(tipoImpresion,false, i));						
			}
			//COPIAS
		} else if (tipoImpresion.equals("COPIA")) {
			for(int i = 1; i <= copias; i++) {
				factura.append(construirFacturas(tipoImpresion,false, i));			
			}
		}
		
		//Log.i("RECIBOS", factura.toString());

		return factura.toString();
	}
	*/
	
	/**
	 * Generamos un documento de Factura con la informacion necesaria.
	 * @param tipo
	 * @param isCopia
	 * @param copia
	 * @return
	 */
	public String construirFacturas(String tipo, boolean isCopia, int copia){
		
		StringBuilder facturaObj = new StringBuilder();
		float Centralizacion    = 0;
		float TotalAPagar		= 0;
		String porcentajeEntero = "";
		String espaciosCentralizacion = "";
		
		facturaObj.append("\n");
		facturaObj.append(ManejoTextoWifi.centrarTexto("Compania Licorera de Nicaragua, S.A.")+"\n");
		facturaObj.append(ManejoTextoWifi.centrarTexto("Centro Pellas 8vo piso, Km 4.5 Carretera Masaya")+"\n");
		facturaObj.append(ManejoTextoWifi.centrarTexto("Servicio al Consumidor 1-800-3636")+"\n");
		facturaObj.append(ManejoTextoWifi.centrarTexto("RUC # J0310000002096")+"\n");
		facturaObj.append(ManejoTextoWifi.centrarTexto(AFC)+"\n\n");
		
		facturaObj.append(ManejoTextoWifi.centrarTexto(titulo + " # " + codFactura) +"\n\n");
		
		if(isCopia)
		{
			facturaObj.append(ManejoTextoWifi.centrarTexto("-------------COPIA # " + copia + "-------------")+"\n\n");
		}else{
			
			facturaObj.append(ManejoTextoWifi.centrarTexto("-------------"+tipo+"-------------")+"\n\n");
		}
		
		facturaObj.append("Codigo    : " + codigo + ManejoTextoWifi.completarEspaciosIzq("Ruta: "+ ruta, 25) + "\n");
		facturaObj.append("Cliente   : " + cliente + "\n");
		facturaObj.append("RUC #     : " + rucCliente + "\n"); //Cambio para RUC				
		facturaObj.append("Fecha     : " + fecha + ManejoTextoWifi.completarEspaciosIzq("Hora: "+ hora,24) + "\n");
		facturaObj.append("Pedido  # : " + pedido + "\n");
		facturaObj.append("Factura de: " + tipoFactura+ ManejoTextoWifi.completarEspaciosDer("          Referencia: "+ facturaManual,26) + "\n");
		facturaObj.append("\n\n");
		
		facturaObj.append("PRODUCTO        CJ      UND        P.UND             TOTAL");
		
		facturaObj.append("\n\n");
		facturaObj.append(this.generarDetalleFactura());
		facturaObj.append("\n");
		facturaObj.append("                                SUBTOTAL C$   "+ ManejoTextoWifi.completarEspaciosIzq(subtotal, 13) + "\n");
		facturaObj.append("                                   I.V.A C$   "+ ManejoTextoWifi.completarEspaciosIzq(iva, 13) + "\n");
		facturaObj.append("                                   TOTAL C$   "+ ManejoTextoWifi.completarEspaciosIzq(total, 13));
		if( Float.parseFloat(porcentajeCentralizacion) > 0 ){

			subtotal = subtotal.replaceAll(",","");

			Centralizacion  		 = Float.parseFloat(porcentajeCentralizacion) * Float.parseFloat(subtotal);
			TotalAPagar			     = Float.parseFloat(total) - Centralizacion;
			porcentajeEntero		 = String.format("%.2f", (Float.parseFloat(porcentajeCentralizacion) * 100));

			if(((int)(Float.parseFloat(porcentajeCentralizacion) * 100)) < 9 ){
				espaciosCentralizacion	 = "                        ";
			}
			if(((int)(Float.parseFloat(porcentajeCentralizacion) * 100)) > 9 && ((int)(Float.parseFloat(porcentajeCentralizacion) * 100)) < 99){
				espaciosCentralizacion	 = "                       ";
			}
			if(((int)(Float.parseFloat(porcentajeCentralizacion) * 100)) == 100){
				espaciosCentralizacion	 = "                      ";
			}
			facturaObj.append("\n");
			facturaObj.append(espaciosCentralizacion + "Descuento (" + porcentajeEntero + "%)C$   " + ManejoTextoWifi.completarEspaciosIzq("(-)" + String.format("%.2f", Centralizacion), 13) + "\n");
			facturaObj.append("                           TOTAL A PAGAR C$   "+ ManejoTextoWifi.completarEspaciosIzq(String.format("%.2f", TotalAPagar), 13));
		}
		facturaObj.append("\n\n\n\n");
		facturaObj.append(ManejoTextoWifi.centrarTexto(" ____________________________")+"\n");
		facturaObj.append(ManejoTextoWifi.centrarTexto("Firma del Cliente")+"\n");
		facturaObj.append("\n\n");
		facturaObj.append(ManejoTextoWifi.centrarTexto("Gracias por su compra.")+"\n");
		facturaObj.append(ManejoTextoWifi.centrarTexto("Favor revisar producto al recibirlo.")+"\n");
		facturaObj.append("\n\n\n");
		
		return facturaObj.toString();
		
	}
	
	/**
	 * Retorna el Documento de Cambio formateado.
	 * @return
	 */
	public String getFactCambio() {
		facturaCambio = new StringBuilder();
		
		//Original mas 1 cambio
		if (tipoImpresion.equals("ORIGINAL") && copias == 0) {
			facturaCambio.append(construirFacturaCambio(tipoImpresion, false, 0));
			facturaCambio.append(construirFacturaCambio("COPIA", true, 1));			
			
			//Copias
		} else {
			for(int i = 1; i <= copias; i++) {
				facturaCambio.append(construirFacturaCambio("COPIA", true, 1));
			}
		}
		
		//Log.i("RECIBOS", facturaCambio.toString());
		
		return facturaCambio.toString();
	}
	
	/**
	 * Generamos el documento Cambio / Devoluciones
	 * @param tipo
	 * @param isCopia
	 * @param copia
	 * @return
	 */
	private String construirFacturaCambio(String tipo, boolean isCopia, int copia){
		StringBuilder facturaCambioObj = new StringBuilder(); 
		
		
		facturaCambioObj.append("\n");
		facturaCambioObj.append(ManejoTextoWifi.centrarTexto("Compania Licorera de Nicaragua, S.A.")+"\n");
		facturaCambioObj.append(ManejoTextoWifi.centrarTexto("Centro Pellas 8vo piso, Km 4.5 Carretera Masaya")+"\n");
		facturaCambioObj.append(ManejoTextoWifi.centrarTexto("Servicio al Consumidor 1-800-3636")+"\n");
		facturaCambioObj.append(ManejoTextoWifi.centrarTexto("RUC # J0310000002096")+"\n");
		facturaCambioObj.append(ManejoTextoWifi.centrarTexto(AFC)+"\n\n");
		
		facturaCambioObj.append(ManejoTextoWifi.centrarTexto(titulo + " # " + codFactura) +"\n\n");
		
		if(isCopia)
		{
			facturaCambioObj.append(ManejoTextoWifi.centrarTexto("-------------COPIA # " + copia + "-------------")+"\n\n");
		}else{
			
			facturaCambioObj.append(ManejoTextoWifi.centrarTexto("-------------"+tipo+"-------------")+"\n\n");
		}
		
		facturaCambioObj.append("Fecha     : " + fecha + ManejoTextoWifi.completarEspaciosIzq("Hora: "+ hora,20) + "\n");
		facturaCambioObj.append("Codigo    : " + codigo + ManejoTextoWifi.completarEspaciosIzq("Ruta: "+ ruta, 20) + "\n");
		facturaCambioObj.append("Cliente   : " + cliente + "\n");
		facturaCambioObj.append("RUC #     : " + rucCliente + "\n"); //Cambio para RUC
		facturaCambioObj.append("\n\n");
		
		facturaCambioObj.append( ManejoTextoWifi.completarEspaciosDer("PRDOUCTO", 37)+"   CJ   UND");
		facturaCambioObj.append("\n\n");
		
		facturaCambioObj.append(this.generarDetalleCambDev());
		facturaCambioObj.append("\n\n\n\n");
		facturaCambioObj.append(ManejoTextoWifi.centrarTexto(" ____________________________")+"\n");
		facturaCambioObj.append(ManejoTextoWifi.centrarTexto("Firma del Cliente")+"\n");
		facturaCambioObj.append("\n\n");
		
		return facturaCambioObj.toString();
		
	}
	
	/**
	 * 
	 * @param tipo
	 * @param isCopia
	 * @param copia
	 * @return
	 */
	private String construirFacturaDevolucion(String tipo, boolean isCopia, int copia){
		StringBuilder facturaDevObj = new StringBuilder(); 
	
		facturaDevObj.append("\n");
		facturaDevObj.append(ManejoTextoWifi.centrarTexto("Compania Licorera de Nicaragua, S.A.")+"\n");
		facturaDevObj.append(ManejoTextoWifi.centrarTexto("Centro Pellas 8vo piso, Km 4.5 Carretera Masaya")+"\n");
		facturaDevObj.append(ManejoTextoWifi.centrarTexto("Servicio al Consumidor 1-800-3636")+"\n");
		facturaDevObj.append(ManejoTextoWifi.centrarTexto("RUC # J0310000002096")+"\n");
		facturaDevObj.append(ManejoTextoWifi.centrarTexto(AFC)+"\n\n");
		
		facturaDevObj.append(ManejoTextoWifi.centrarTexto(titulo + " # " + codFactura) +"\n\n");
		
		if(isCopia)
		{
			facturaDevObj.append(ManejoTextoWifi.centrarTexto("-------------COPIA # " + copia + "-------------")+"\n\n");
		}else{
			
			facturaDevObj.append(ManejoTextoWifi.centrarTexto("-------------"+tipo+"-------------")+"\n\n");
		}
		
		facturaDevObj.append("Fecha     : " + fecha + ManejoTextoWifi.completarEspaciosIzq("Hora: "+ hora,20) + "\n");
		facturaDevObj.append("Codigo    : " + codigo + ManejoTextoWifi.completarEspaciosIzq("Ruta: "+ ruta, 20) + "\n");
		facturaDevObj.append("Cliente   : " + cliente + "\n");
		facturaDevObj.append("RUC #     : " + rucCliente + "\n"); //Cambio para RUC
		facturaDevObj.append("\n\n");
		
		facturaDevObj.append("Factura #      : " + factNum + ManejoTextoWifi.completarEspaciosIzq("Fecha: "+ fechaFact,20) + "\n");
		facturaDevObj.append("Monto Original :   " + montoOriginal + "\n");
		facturaDevObj.append("Saldo          :   " + saldo);
		facturaDevObj.append("\n\n");		
		
		facturaDevObj.append( ManejoTextoWifi.completarEspaciosDer("PRDOUCTO", 37)+"   CJ   UND");
		facturaDevObj.append("\n\n");
		
		facturaDevObj.append(this.generarDetalleCambDev());
		facturaDevObj.append("\n\n\n\n");
		facturaDevObj.append(ManejoTextoWifi.centrarTexto(" ____________________________")+"\n");
		facturaDevObj.append(ManejoTextoWifi.centrarTexto("Firma del Cliente")+"\n");
		facturaDevObj.append("\n\n");
		
		
		return facturaDevObj.toString();
	}
	
	
	
	public String getFactDevolucion() {
		facturaDevolucion = new StringBuilder();
		
		if (tipoImpresion.equals("ORIGINAL") && copias == 0) {
			
			facturaDevolucion.append(construirFacturaDevolucion(tipoImpresion, false, 1));
			facturaDevolucion.append(construirFacturaDevolucion("COPIA", true, 1));
			
		} else {
			for(int i = 1; i <= copias; i++) {
				facturaDevolucion.append(construirFacturaDevolucion("COPIA", true, i));
			}
		}
		
		
		//Log.i("RECIBOS", facturaDevolucion.toString());
		
		return facturaDevolucion.toString();
	}
	
	public void setnumeroCopia (int numeroCopia){
		this.numeroCopia= numeroCopia;
		
	}
	
	public void setfacturaManual (String facturaManual){
		this.facturaManual= facturaManual;
		
	}

	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}

	public void setTipoImpresion(String tipoImpresion) {
		this.tipoImpresion = tipoImpresion;
	}

	public void setCodigo(String codigo) {
		this.codigo = codigo;
	}

	public void setRuta(String ruta) {
		this.ruta = ruta;
	}

	public void setCliente(String cliente) {
		this.cliente = cliente;
	}

	public void setCodFactura(String codFactura) {
		this.codFactura = codFactura;
	}

	public void setFactNum(String factNum) {
		this.factNum = factNum;
	}

	public void setFecha(String fecha) {
		this.fecha = fecha;
	}

	public void setFechaFact(String fechaFact) {
		this.fechaFact = fechaFact;
	}

	public void setHora(String hora) {
		this.hora = hora;
	}

	public void setPedido(String pedido) {
		this.pedido = pedido;
	}

	public void setTipoFactura(String tipoFactura) {
		this.tipoFactura = tipoFactura;
	}

	public void setSubtotal(String subtotal) {
		this.subtotal = subtotal;
	}

	public void setIva(String iva) {
		this.iva = iva;
	}

	public void setTotal(String total) {
		this.total = total;
	}

	public void setMontoOriginal(String montoOriginal) {
		this.montoOriginal = montoOriginal;
	}

	public void setSaldo(String saldo) {
		this.saldo = saldo;
	}

	public void setCopias(int copias) {
		this.copias = copias;
	}
	
	

	public void setDatosLineas(JSONArray datosLineas) {
		this.datosLineas = datosLineas;
	}

	/**
	 * Genera el detalle de la Factura para imprimir a partir de un ArrayList de
	 * Arreglos de Textos. datosLineas.add(new
	 * String[]{"codigoProd","Descrip","CJ","BOT","P.BOT", "TOTAL"});
	 * 
	 * @param datosLineas
	 * @return
	 */
	public String generarDetalleFactura() {
		String lineaProd = "";
		String detalleFactura = "";
		JSONObject jsonObj = null;
		String codProd, prod, caj, bot, pbot, tot;

		if (this.datosLineas != null) {
			for (int i = 0; i < datosLineas.length(); i++){
				jsonObj = datosLineas.optJSONObject(i);
				
				codProd = jsonObj.optString("codigoProducto");
				prod = jsonObj.optString("producto");
				caj = jsonObj.optString("CAJ");
				bot = jsonObj.optString("BOT");
				pbot = jsonObj.optString("PBOT");
				tot = jsonObj.optString("total");

				if (codProd != "null" && prod != "null" && caj != "null" && bot != "null" && pbot != "null" && tot != "null") {
					lineaProd = completarEspaciosDer(codProd, 13) + " " + prod + "\n"
							+ "         "
							+ completarEspaciosIzq(caj, 9) + "   "
							+ completarEspaciosIzq(bot, 5) + " "
							+ completarEspaciosIzq(pbot, 15) + " "
							+ completarEspaciosIzq(tot, 17) + "\n";
					
					detalleFactura += lineaProd;
				}
			}
			return detalleFactura;
		} else {
			return "             DETALLE DE PRODUCTOS N/D\n";
		}

	}
	
	public String generarDetalleCambDev() {
		StringBuilder strBdetalleInventario = new StringBuilder();
		JSONObject jsonObj = null;
		String codigoProducto, nombreProducto, caja, botella, producto, motivoCambio, temp;
		
		if (this.datosLineas != null) {
			for (int i = 0; i < datosLineas.length(); i++){
				jsonObj = datosLineas.optJSONObject(i);
				
				codigoProducto = jsonObj.optString("codigoProducto");
				nombreProducto = jsonObj.optString("producto");
				caja = jsonObj.optString("CAJ");
				botella = jsonObj.optString("BOT");
				motivoCambio = jsonObj.optString("motivoCambio");
				temp = codigoProducto + " " + nombreProducto;
				
				if (temp.length() > 44) {
					producto = temp.substring(0, 43);
				} else {
					producto = temp;
				}

				if (titulo.equals("CAMBIO")) {
					if (codigoProducto != "null" && nombreProducto != "null" && caja != "null" && botella != "null") {
						strBdetalleInventario.append(producto + "\n");
						
						strBdetalleInventario.append(
								completarEspaciosDer(motivoCambio, 35)
								+ completarEspaciosIzq(caja, 5)
								+ completarEspaciosIzq(botella, 6) + "\n"
							);
					}
				} else if (titulo.equals("DEVOLUCION")) {
					if (codigoProducto != "null" && nombreProducto != "null" && caja != "null" && botella != "null") {
						strBdetalleInventario.append(
								completarEspaciosDer(producto, 37)
								+ completarEspaciosIzq(caja, 5)
								+ completarEspaciosIzq(botella, 6) + "\n"
							);
					}
				}
			}
			return strBdetalleInventario.toString();
		} else {
			return "             DETALLE DE PRODUCTOS N/D\n";
		}
	}

	/**
	 * Rellena los espacios necesarios para alinear los item
	 * 
	 * @param item
	 * @param espacios
	 * @return
	 */
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

	
	/*Cambio para el RUC del Cliente*/
	public String getRucCliente() {
		return rucCliente;
	}

	public void setRucCliente(String rucCliente) {
		this.rucCliente = rucCliente;
	}
}
