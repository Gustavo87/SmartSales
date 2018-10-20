package PlantillasAPEX3;

import org.json.JSONArray;
import org.json.JSONObject;

import android.util.Log;

/**
 * 
 * @author cgarcia
 */
public class PlantillaFactura {

	private String tipoImpresion = "N/D", titulo = "N/D", codigo = "N/D    ", ruta = "N/D", cliente = "N/D",
			factNum = "N/D", codFactura = "N/D", fecha = "dd/mm/aa", fechaFact = "dd/mm/aa", hora = "N/D",
			pedido = "N/D", tipoFactura = "N/D", subtotal = "N/D", iva = "N/D",
			total = "N/D", montoOriginal = "N/D", saldo = "N/D",facturaManual="N/D";
	
	private int numeroCopia;
	
	private String rucCliente = "N/D";
	
	private final String AFC = "AFC DGI ASFC/07/0009/12/2011/5";
	
	private int copias = 1;
	
	private JSONArray datosLineas = null;
	
	private StringBuilder factura;
	private StringBuilder facturaCambio;
	private StringBuilder facturaDevolucion;

	public PlantillaFactura() {
	}

	public String getFactura() {
		factura = new StringBuilder();
		
		if (tipoImpresion.equals("ORIGINAL") && copias == 0) {
			this.setFacturaOriginal(factura);
		} else if (tipoImpresion.equals("REIMPRESION") && copias > 0) {
			for(int i = 1; i <= copias; i++) {
				factura.append("J4");
				factura.append("           Compania Licorera de Nicaragua, S.A.\n");
				factura.append("    Centro Pellas 8vo piso, Km 4.5 Carretera a Masaya\n");
				factura.append("            Servicio al Consumidor 1-800-3636\n");
				factura.append("                   RUC # J0310000002096\n");
				factura.append("                   " + AFC);
				factura.append("J4");
				factura.append("               U1" + titulo + " #U0 " + codFactura);
				factura.append("J4");
				factura.append("-----------------------REIMPRESION-----------------------");
				factura.append("J4");
				factura.append("U1CodigoU0    : " + codigo + "                     U1RutaU0: "+ ruta + "\n");
				factura.append("U1ClienteU0   : " + cliente + "\n");
				factura.append("U1RUC #  U0   : " + rucCliente + "\n"); //Cambio para RUC				
				factura.append("U1FechaU0     : " + fecha + "                  U1HoraU0: "+ hora + "\n");
				factura.append("U1Pedido  #U0 : " + pedido + "\n");
				factura.append("U1Factura deU0: " + tipoFactura +"          U1Referencia #U0: "+ facturaManual + "\n");
				factura.append("J4");
				factura.append("U1PRODUCTO       CJ   BOT     P.BOT          TOTALU0");
				factura.append("J4");
				factura.append(this.generarDetalleFactura());
				factura.append("J4");
				factura.append("                           U1SUBTOTAL C$U0   "+ completarEspaciosIzq(subtotal, 16) + "\n");
				factura.append("                              U1I.V.A C$U0   "+ completarEspaciosIzq(iva, 16) + "\n");
				factura.append("                              U1TOTAL C$U0   "+ completarEspaciosIzq(total, 16));
				factura.append("J8 J8 J2");
				factura.append("               ____________________________\n");
				factura.append("                   Firma del Cliente");
				factura.append("J8");
				factura.append("                Gracias por su compra.\n");
				factura.append("         Favor revisar producto al recibirlo.");
				factura.append("J8 J8 J8 J2");
			}
		} else if (tipoImpresion.equals("COPIA")) {
			for(int i = 1; i <= copias; i++) {
				factura.append("           Compania Licorera de Nicaragua, S.A.\n");
				factura.append("    Centro Pellas 8vo piso, Km 4.5 Carretera a Masaya\n");
				factura.append("            Servicio al Consumidor 1-800-3636\n");
				factura.append("                   RUC # J0310000002096\n");
				factura.append("                   " + AFC);
				factura.append("J4");
				factura.append("               U1" + titulo + " #U0 " + codFactura);
				factura.append("J4");
				factura.append("--------------------------COPIA-------------------------");
				factura.append("J4");
				factura.append("U1CodigoU0    : " + codigo + "                     U1RutaU0: "+ ruta + "\n");
				factura.append("U1ClienteU0   : " + cliente + "\n");
				factura.append("U1RUC #  U0   : " + rucCliente + "\n"); //Cambio para RUC		
				factura.append("U1FechaU0     : " + fecha + "                  U1HoraU0: "+ hora + "\n");
				factura.append("U1Pedido  #U0 : " + pedido + "\n");
				factura.append("U1Factura deU0: " + tipoFactura +"          U1Referencia #U0: "+ facturaManual + "\n");
				factura.append("J4");
				factura.append("U1PRODUCTO       CJ   BOT     P.BOT          TOTALU0");
				factura.append("J4");
				factura.append(this.generarDetalleFactura());
				factura.append("J4");
				factura.append("                           U1SUBTOTAL C$U0   "+ completarEspaciosIzq(subtotal, 16) + "\n");
				factura.append("                              U1I.V.A C$U0   "+ completarEspaciosIzq(iva, 16) + "\n");
				factura.append("                              U1TOTAL C$U0   "+ completarEspaciosIzq(total, 16));
				factura.append("J8 J8 J2");
				factura.append("               ____________________________\n");
				factura.append("                   Firma del Cliente");
				factura.append("J8");
				factura.append("                Gracias por su compra.\n");
				factura.append("         Favor revisar producto al recibirlo.");
				factura.append("J8 J8 J8 J2");
			}
		} else if(tipoImpresion.equals("FACTURACOPIA")){
			imprimirCopias(factura,numeroCopia);
		}
		
		Log.i("RECIBOS", factura.toString());

		return factura.toString();
	}
	
	public String getFactCambio() {
		facturaCambio = new StringBuilder();
		
		if (tipoImpresion.equals("ORIGINAL") && copias == 0) {
			facturaCambio.append("J4");
			facturaCambio.append("           Compania Licorera de Nicaragua, S.A.\n");
			facturaCambio.append("    Centro Pellas 8vo piso, Km 4.5 Carretera a Masaya\n");
			facturaCambio.append("            Servicio al Consumidor 1-800-3636\n");
			facturaCambio.append("                   RUC # J0310000002096\n");
			facturaCambio.append("J4");
			facturaCambio.append("             U1" + titulo + " #U0 " + codFactura);
			facturaCambio.append("J4");
			facturaCambio.append("-------------------------ORIGINAL------------------------");
			facturaCambio.append("J4");
			facturaCambio.append("U1FechaU0     : " + fecha + "                   U1HoraU0: "+ hora + "\n");
			facturaCambio.append("U1CodigoU0    : " + codigo + "                    U1RutaU0: "+ ruta + "\n");
			facturaCambio.append("U1ClienteU0   : " + cliente + "\n");
			facturaCambio.append("U1RUC #  U0   : " + rucCliente + "\n"); //Cambio para RUC	
			facturaCambio.append("J4");
			facturaCambio.append("U1PRDOUCTO                                        CJ   BOTU0");
			facturaCambio.append("J4");
			facturaCambio.append(this.generarDetalleCambDev());
			facturaCambio.append("J8 J8");
			facturaCambio.append("               ____________________________\n");
			facturaCambio.append("                   Firma del Cliente");
			
			for(int i = 1; i <= 1; i++) {
				facturaCambio.append("J8 J8 J8 J2");
				facturaCambio.append("           Compania Licorera de Nicaragua, S.A.\n");
				facturaCambio.append("    Centro Pellas 8vo piso, Km 4.5 Carretera a Masaya\n");
				facturaCambio.append("            Servicio al Consumidor 1-800-3636\n");
				facturaCambio.append("                   RUC # J0310000002096\n");
				facturaCambio.append("J4");
				facturaCambio.append("             U1" + titulo + " #U0 " + codFactura);
				facturaCambio.append("J4");
				facturaCambio.append("-------------------------COPIA # " + i + "------------------------");
				facturaCambio.append("J4");
				facturaCambio.append("U1FechaU0     : " + fecha + "                   U1HoraU0: "+ hora + "\n");
				facturaCambio.append("U1CodigoU0    : " + codigo + "                    U1RutaU0: "+ ruta + "\n");
				facturaCambio.append("U1ClienteU0   : " + cliente + "\n");
				facturaCambio.append("U1RUC #  U0   : " + rucCliente + "\n"); //Cambio para RUC
				facturaCambio.append("J4");
				facturaCambio.append("U1PRDOUCTO                                        CJ   BOTU0");
				facturaCambio.append("J4");
				facturaCambio.append(this.generarDetalleCambDev());
				facturaCambio.append("J8 J8");
				facturaCambio.append("               ____________________________\n");
				facturaCambio.append("                   Firma del Cliente");
				facturaCambio.append("J8 J8 J8 J2");
			}
		} else {
			for(int i = 1; i <= copias; i++) {
				facturaCambio.append("           Compania Licorera de Nicaragua, S.A.\n");
				facturaCambio.append("    Centro Pellas 8vo piso, Km 4.5 Carretera a Masaya\n");
				facturaCambio.append("            Servicio al Consumidor 1-800-3636\n");
				facturaCambio.append("                   RUC # J0310000002096\n");
				facturaCambio.append("J4");
				facturaCambio.append("             U1" + titulo + " #U0 " + codFactura);
				facturaCambio.append("J4");
				facturaCambio.append("--------------------------COPIA--------------------------");
				facturaCambio.append("J4");
				facturaCambio.append("U1FechaU0     : " + fecha + "                   U1HoraU0: "+ hora + "\n");
				facturaCambio.append("U1CodigoU0    : " + codigo + "                    U1RutaU0: "+ ruta + "\n");
				facturaCambio.append("U1ClienteU0   : " + cliente + "\n");
				facturaCambio.append("U1RUC #  U0   : " + rucCliente + "\n"); //Cambio para RUC
				facturaCambio.append("J4");
				facturaCambio.append("U1PRDOUCTO                                        CJ   BOTU0");
				facturaCambio.append("J4");
				facturaCambio.append(this.generarDetalleCambDev());
				facturaCambio.append("J8 J8");
				facturaCambio.append("               ____________________________\n");
				facturaCambio.append("                   Firma del Cliente");
				facturaCambio.append("J8 J8 J8 J2");
			}
		}
		
		
		Log.i("RECIBOS", facturaCambio.toString());
		
		return facturaCambio.toString();
	}
	
	public String getFactDevolucion() {
		facturaDevolucion = new StringBuilder();
		
		if (tipoImpresion.equals("ORIGINAL") && copias == 0) {
			facturaDevolucion.append("J4");
			facturaDevolucion.append("           Compania Licorera de Nicaragua, S.A.\n");
			facturaDevolucion.append("    Centro Pellas 8vo piso, Km 4.5 Carretera a Masaya\n");
			facturaDevolucion.append("            Servicio al Consumidor 1-800-3636\n");
			facturaDevolucion.append("                   RUC # J0310000002096\n");
			facturaDevolucion.append("J4");
			facturaDevolucion.append("             U1" + titulo + " #U0 " + codFactura);
			facturaDevolucion.append("J4");
			facturaDevolucion.append("-------------------------ORIGINAL------------------------");
			facturaDevolucion.append("J4");
			facturaDevolucion.append("U1FechaU0     : " + fecha + "                 U1HoraU0: "+ hora + "\n");
			facturaDevolucion.append("U1CodigoU0    : " + codigo + "                    U1RutaU0: "+ ruta + "\n");
			facturaDevolucion.append("U1ClienteU0   : " + cliente + "\n");
			facturaDevolucion.append("U1RUC #  U0   : " + rucCliente + "\n"); //Cambio para RUC
			facturaDevolucion.append("J4");
			facturaDevolucion.append("U1Factura #U0 : " + factNum + "              U1FechaU0: " + fechaFact + "\n");
			facturaDevolucion.append("U1Monto OriginalU0 :   " + montoOriginal + "\n");
			facturaDevolucion.append("U1SaldoU0          :   " + saldo);
			facturaDevolucion.append("J4");
			facturaDevolucion.append("U1PRDOUCTO                                        CJ   BOTU0");
			facturaDevolucion.append("J4");
			facturaDevolucion.append(this.generarDetalleCambDev());
			facturaDevolucion.append("J8 J8");
			facturaDevolucion.append("               ____________________________\n");
			facturaDevolucion.append("                   Firma del Cliente");
			
			for(int i = 1; i <= 1; i++) {
				facturaDevolucion.append("J8 J8 J8 J2");
				facturaDevolucion.append("           Compania Licorera de Nicaragua, S.A.\n");
				facturaDevolucion.append("    Centro Pellas 8vo piso, Km 4.5 Carretera a Masaya\n");
				facturaDevolucion.append("            Servicio al Consumidor 1-800-3636\n");
				facturaDevolucion.append("                   RUC # J0310000002096\n");
				facturaDevolucion.append("J4");
				facturaDevolucion.append("             U1" + titulo + " #U0 " + codFactura);
				facturaDevolucion.append("J4");
				facturaDevolucion.append("-------------------------COPIA # " + i + "------------------------");
				facturaDevolucion.append("J4");
				facturaDevolucion.append("U1FechaU0     : " + fecha + "                 U1HoraU0: "+ hora + "\n");
				facturaDevolucion.append("U1CodigoU0    : " + codigo + "                    U1RutaU0: "+ ruta + "\n");
				facturaDevolucion.append("U1ClienteU0   : " + cliente + "\n");
				facturaDevolucion.append("U1RUC #  U0   : " + rucCliente + "\n"); //Cambio para RUC
				facturaDevolucion.append("J4");
				facturaDevolucion.append("U1Factura #U0 : " + factNum + "              U1FechaU0: " + fechaFact + "\n");
				facturaDevolucion.append("U1Monto OriginalU0 :   " + montoOriginal + "\n");
				facturaDevolucion.append("U1SaldoU0          :   " + saldo);
				facturaDevolucion.append("J4");
				facturaDevolucion.append("U1PRDOUCTO                                        CJ   BOTU0");
				facturaDevolucion.append("J4");
				facturaDevolucion.append(this.generarDetalleCambDev());
				facturaDevolucion.append("J8 J8");
				facturaDevolucion.append("               ____________________________\n");
				facturaDevolucion.append("                   Firma del Cliente");
				facturaDevolucion.append("J8 J8 J8 J2");
			}
		} else {
			for(int i = 1; i <= copias; i++) {
				facturaDevolucion.append("           Compania Licorera de Nicaragua, S.A.\n");
				facturaDevolucion.append("    Centro Pellas 8vo piso, Km 4.5 Carretera a Masaya\n");
				facturaDevolucion.append("            Servicio al Consumidor 1-800-3636\n");
				facturaDevolucion.append("                   RUC # J0310000002096\n");
				facturaDevolucion.append("J4");
				facturaDevolucion.append("             U1" + titulo + " #U0 " + codFactura);
				facturaDevolucion.append("J4");
				facturaDevolucion.append("--------------------------COPIA---------------------------");
				facturaDevolucion.append("J4");
				facturaDevolucion.append("U1FechaU0     : " + fecha + "                 U1HoraU0: "+ hora + "\n");
				facturaDevolucion.append("U1CodigoU0    : " + codigo + "                    U1RutaU0: "+ ruta + "\n");
				facturaDevolucion.append("U1ClienteU0   : " + cliente + "\n");
				facturaDevolucion.append("U1RUC #  U0   : " + rucCliente + "\n"); //Cambio para RUC
				facturaDevolucion.append("J4");
				facturaDevolucion.append("U1Factura #U0 : " + factNum + "              U1FechaU0: " + fechaFact + "\n");
				facturaDevolucion.append("U1Monto OriginalU0 :   " + montoOriginal + "\n");
				facturaDevolucion.append("U1SaldoU0          :   " + saldo);
				facturaDevolucion.append("J4");
				facturaDevolucion.append("U1PRDOUCTO                                        CJ   BOTU0");
				facturaDevolucion.append("J4");
				facturaDevolucion.append(this.generarDetalleCambDev());
				facturaDevolucion.append("J8 J8");
				facturaDevolucion.append("               ____________________________\n");
				facturaDevolucion.append("                   Firma del Cliente");
				facturaDevolucion.append("J8 J8 J8 J2");
			}
		}
		
		
		Log.i("RECIBOS", facturaDevolucion.toString());
		
		return facturaDevolucion.toString();
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
	public void setfacturaManual (String facturaManual){
		this.facturaManual= facturaManual;
		
	}
	
	public void setnumeroCopia(int numeroCopia){
		this.numeroCopia=numeroCopia;
	}
	
	public void imprimirCopias(StringBuilder fact,int numeroCopia){
		fact.append("           Compania Licorera de Nicaragua, S.A.\n");
		fact.append("    Centro Pellas 8vo piso, Km 4.5 Carretera a Masaya\n");
		fact.append("            Servicio al Consumidor 1-800-3636\n");
		fact.append("                   RUC # J0310000002096\n");
		fact.append("                   " + AFC);
		fact.append("J4");
		fact.append("               U1" + titulo + " # " + codFactura + "U0");
		fact.append("J4");
		fact.append("------------------------COPIA # " + numeroCopia + "-----------------------");
		fact.append("J4");
		fact.append("U1CodigoU0    : " + codigo + "                     U1RutaU0: "+ ruta + "\n");
		fact.append("U1ClienteU0   : " + cliente + "\n");
		fact.append("U1RUC #  U0   : " + rucCliente + "\n"); //Cambio para RUC
		fact.append("U1FechaU0     : " + fecha + "                   U1HoraU0: "+ hora + "\n");
		fact.append("U1Pedido  #U0 : " + pedido + "\n");
		fact.append("U1Factura deU0: " + tipoFactura +"             U1Referencia #U0: "+ facturaManual + "\n");
		fact.append("J4");
		fact.append("U1PRODUCTO       CJ   BOT     P.BOT          TOTALU0");
		fact.append("J4");
		fact.append(this.generarDetalleFactura());
		fact.append("J2");
		fact.append("                           U1SUBTOTAL C$U0   "+ completarEspaciosIzq(subtotal, 16) + "\n");
		fact.append("                              U1I.V.A C$U0   "+ completarEspaciosIzq(iva, 16) + "\n");
		fact.append("                              U1TOTAL C$U0   "+ completarEspaciosIzq(total, 16));
		fact.append("J8 J8");
		fact.append("               ____________________________\n");
		fact.append("                   Firma del Cliente");
		fact.append("J8");
		fact.append("                Gracias por su compra.\n");
		fact.append("         Favor revisar producto al recibirlo.");
		fact.append("J8 J8 J8 J2");
	}
	public void setFacturaOriginal(StringBuilder fact) {
		fact.append("J4");
		fact.append("           Compania Licorera de Nicaragua, S.A.\n");
		fact.append("    Centro Pellas 8vo piso, Km 4.5 Carretera a Masaya\n");
		fact.append("            Servicio al Consumidor 1-800-3636\n");
		fact.append("                   RUC # J0310000002096\n");
		fact.append("                   " + AFC);
		fact.append("J4");
		fact.append("               U1" + titulo + " # " + codFactura + "U0");
		fact.append("J4");
		fact.append("-------------------------ORIGINAL------------------------");
		fact.append("J4");
		fact.append("U1CodigoU0    : " + codigo + "                     U1RutaU0: "+ ruta + "\n");
		fact.append("U1ClienteU0   : " + cliente + "\n");
		fact.append("U1RUC #  U0   : " + rucCliente + "\n"); //Cambio para RUC
		fact.append("U1FechaU0     : " + fecha + "                  U1HoraU0: "+ hora + "\n");
		fact.append("U1Pedido  #U0 : " + pedido + "\n");
		fact.append("U1Factura deU0: " + tipoFactura +"             U1Referencia #U0: "+ facturaManual + "\n");
		fact.append("J4");
		fact.append("U1PRODUCTO       CJ   BOT     P.BOT          TOTALU0");
		fact.append("J4");
		fact.append(this.generarDetalleFactura());
		fact.append("J2");
		fact.append("                           U1SUBTOTAL C$U0   "+ completarEspaciosIzq(subtotal, 16) + "\n");
		fact.append("                              U1I.V.A C$U0   "+ completarEspaciosIzq(iva, 16) + "\n");
		fact.append("                              U1TOTAL C$U0   "+ completarEspaciosIzq(total, 16));
		fact.append("J8 J8");
		fact.append("               ____________________________\n");
		fact.append("                   Firma del Cliente");
		fact.append("J8");
		fact.append("                Gracias por su compra.\n");
		fact.append("         Favor revisar producto al recibirlo.");
		fact.append("J8 J8 J8 J2");
		/*
		for(int i = 1; i <= 2; i++) {
			fact.append("           Compania Licorera de Nicaragua, S.A.\n");
			fact.append("    Centro Pellas 8vo piso, Km 4.5 Carretera a Masaya\n");
			fact.append("            Servicio al Consumidor 1-800-3636\n");
			fact.append("                   RUC # J0310000002096\n");
			fact.append("                   " + AFC);
			fact.append("J4");
			fact.append("               U1" + titulo + " # " + codFactura + "U0");
			fact.append("J4");
			fact.append("------------------------COPIA # " + i + "-----------------------");
			fact.append("J4");
			fact.append("U1CodigoU0    : " + codigo + "                     U1RutaU0: "+ ruta + "\n");
			fact.append("U1ClienteU0   : " + cliente + "\n");
			fact.append("U1RUC #  U0   : " + rucCliente + "\n"); //Cambio para RUC
			fact.append("U1FechaU0     : " + fecha + "                   U1HoraU0: "+ hora + "\n");
			fact.append("U1Pedido  #U0 : " + pedido + "\n");
			fact.append("U1Factura deU0: " + tipoFactura +"             U1Referencia #U0: "+ facturaManual + "\n");
			fact.append("J4");
			fact.append("U1PRODUCTO       CJ   BOT     P.BOT          TOTALU0");
			fact.append("J4");
			fact.append(this.generarDetalleFactura());
			fact.append("J2");
			fact.append("                           U1SUBTOTAL C$U0   "+ completarEspaciosIzq(subtotal, 16) + "\n");
			fact.append("                              U1I.V.A C$U0   "+ completarEspaciosIzq(iva, 16) + "\n");
			fact.append("                              U1TOTAL C$U0   "+ completarEspaciosIzq(total, 16));
			fact.append("J8 J8");
			fact.append("               ____________________________\n");
			fact.append("                   Firma del Cliente");
			fact.append("J8");
			fact.append("                Gracias por su compra.\n");
			fact.append("         Favor revisar producto al recibirlo.");
			fact.append("J8 J8 J8 J2");
		}
		*/
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
					lineaProd = codProd + " " + prod + "\n"
							+ "           "
							+ completarEspaciosIzq(caj, 6) + "   "
							+ completarEspaciosIzq(bot, 2) + "   "
							+ completarEspaciosIzq(pbot, 12) + " "
							+ completarEspaciosIzq(tot, 16) + "\n";
					
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
								completarEspaciosDer(motivoCambio, 45)
								+ completarEspaciosIzq(caja, 5)
								+ completarEspaciosIzq(botella, 6) + "\n"
							);
					}
				} else if (titulo.equals("DEVOLUCION")) {
					if (codigoProducto != "null" && nombreProducto != "null" && caja != "null" && botella != "null") {
						strBdetalleInventario.append(
								completarEspaciosDer(producto, 45)
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
