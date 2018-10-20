package PlantillasSPPR300;

import org.json.JSONArray;
import org.json.JSONObject;

import android.util.Log;

public class PlantillaInventarioWifi {

	private String tituloInventario = "N/D", fecha = "N/D", ruta = "N/D", hora = "N/D";
	private int totalCAJ = 0, totalBOT = 0;
	
	private JSONArray detalleInventario = null;
	
	private StringBuilder inventarioAbordo;
	private int CARACTERES = 64, CAJA = 5, BOT = 5, SKU = 54;

	public PlantillaInventarioWifi() {
	}
	
	public String getInventarioABordo() {
		inventarioAbordo = new StringBuilder();
		/*
		inventarioAbordo.append(ManejoTextoWifi.centrarTexto(tituloInventario));
		inventarioAbordo.append("\n\n");
		inventarioAbordo.append("Fecha: " + fecha + "           Hora: "+ hora + "\n");
		inventarioAbordo.append("Ruta : " + ruta);
		inventarioAbordo.append("\n\n");
		inventarioAbordo.append(ManejoTextoWifi.completarEspaciosDer("PRDOUCTO", SKU) + "" + ManejoTextoWifi.completarEspaciosIzq("CJ",CAJA) + ManejoTextoWifi.completarEspaciosIzq("BOT", BOT));
		inventarioAbordo.append("\n");
		//inventarioAbordo.append("123456789012345678901234567890123456789012345678901234567890");
		inventarioAbordo.append(this.generarDetalleInventario());
		inventarioAbordo.append("\n");
		inventarioAbordo.append("\n" + ManejoTextoWifi.completarEspaciosIzq("Total", 37) + "" + ManejoTextoWifi.completarEspaciosIzq(String.valueOf(totalCAJ), 5) + ManejoTextoWifi.completarEspaciosIzq(String.valueOf(totalBOT), 6));
		inventarioAbordo.append("\n");
		inventarioAbordo.append(ManejoTextoWifi.centrarTexto("----------ULTIMA LINEA----------"));
		///inventarioAbordo.append("J8 J8 J8 J2");
		//Log.i("RECIBOS", inventarioAbordo.toString());
		*/
		inventarioAbordo.append(ManejoTextoWifi.centrarTexto(tituloInventario));
		inventarioAbordo.append("\n\n");
		inventarioAbordo.append("Fecha: " + fecha + "           Hora: "+ hora + "\n");
		inventarioAbordo.append("Ruta : " + ruta+"\n\n");
		inventarioAbordo.append(ManejoTextoWifi.completarEspaciosDer("PRODOUCTO", SKU) + "" + ManejoTextoWifi.completarEspaciosIzq("CJ",CAJA) + ManejoTextoWifi.completarEspaciosIzq("UND", BOT));
		inventarioAbordo.append("\n" + this.generarDetalleInventario());
		inventarioAbordo.append("\n" + ManejoTextoWifi.completarEspaciosIzq("Total", 53) + "" + ManejoTextoWifi.completarEspaciosIzq(String.valueOf(totalCAJ), 5) + ManejoTextoWifi.completarEspaciosIzq(String.valueOf(totalBOT), 6));
		inventarioAbordo.append("\n" +ManejoTextoWifi.centrarTexto("----------ULTIMA LINEA----------"));
		inventarioAbordo.append("\n  ");
		inventarioAbordo.append("\n  ");
		inventarioAbordo.append("\n  ");
		return inventarioAbordo.toString();
	}

	public void setTituloInventario(String tituloInventario) {
		this.tituloInventario = tituloInventario;
	}

	public void setFecha(String fecha) {
		this.fecha = fecha;
	}

	public void setRuta(String ruta) {
		this.ruta = ruta;
	}

	public void setHora(String hora) {
		this.hora = hora;
	}
	
	public void setDetalleInventario(JSONArray detalleInventario) {
		this.detalleInventario = detalleInventario;
	}

	public String generarDetalleInventario() {
		StringBuilder strBdetalleInventario = new StringBuilder();
		JSONObject jsonObj = null;
		String codigoProducto = "", nombreProducto = "", caja, botella, producto, temp, tituloLinea = "",
				datTipoT[], datTipoN[], tituloDanio = "";
		boolean hayDatosTitulo = false;
		boolean hayDatosDanios = false;

		if (this.detalleInventario != null) {
			for (int i = 0; i < detalleInventario.length(); i++){
				jsonObj = detalleInventario.optJSONObject(i);
				
				try {
					hayDatosTitulo = true;
					
					datTipoT = jsonObj.optString("codigoProducto").split("\n");
					
					tituloLinea = datTipoT[0];
					codigoProducto = datTipoT[1];
					
				} catch (Exception e) {
					hayDatosTitulo = false;
				}
				
				try {
					hayDatosDanios = true;
					
					datTipoN = jsonObj.optString("nombreProducto").split("\n");
					
					tituloDanio = datTipoN[1];
					nombreProducto = datTipoN[0];
					
				} catch (Exception e) {
					hayDatosDanios = false;
				}
				
				//codigoProducto = jsonObj.optString("codigoProducto");
				//nombreProducto = jsonObj.optString("nombreProducto");
				
				caja = jsonObj.optString("caja");
				totalCAJ += Integer.parseInt(caja);
				
				botella = jsonObj.optString("botella");
				totalBOT += Integer.parseInt(botella);
				
				if (hayDatosTitulo == false && hayDatosDanios == false) {
					codigoProducto = jsonObj.optString("codigoProducto");
					nombreProducto = jsonObj.optString("nombreProducto");
					
					
					temp = ManejoTextoWifi.completarEspaciosDer(codigoProducto, 14) + " " + nombreProducto;
					
					if (temp.length() > SKU) {
						producto = temp.substring(0, SKU - 1);
					} else {
						producto = temp;
					}
					
					
					if (codigoProducto != "null" && nombreProducto != "null" && caja != "null" && botella != "null") {
					
						if(codigoProducto.equals("FDC") || codigoProducto.equals("RP"))
						{
							//IMPRESION DE ENVASES
							strBdetalleInventario.append(
									ManejoTextoWifi.completarEspaciosDer(producto, SKU)
									//+ ManejoTextoWifi.completarEspaciosIzq(caja, CAJA)
									+ ManejoTextoWifi.completarEspaciosIzq(botella, BOT) + "\n"
								);
							
						}else{
							strBdetalleInventario.append(
									ManejoTextoWifi.completarEspaciosDer(producto, SKU)
									+ ManejoTextoWifi.completarEspaciosIzq(caja, CAJA)
									+ ManejoTextoWifi.completarEspaciosIzq(botella, BOT) + "\n"
								);
							
						}
						
						
						
					
					
					}
				}
				
				if (hayDatosTitulo == true && hayDatosDanios == true) {
					temp = codigoProducto + " " + nombreProducto;
					
					if (temp.length() > SKU) {
						producto = temp.substring(0, SKU - 1);
					} else {
						producto = temp;
					}
					
					if (codigoProducto != "null" && nombreProducto != "null" && caja != "null" && botella != "null") {
						strBdetalleInventario.append(
								tituloLinea + "\n"
								+ ManejoTextoWifi.completarEspaciosDer(producto, SKU)
								+ ManejoTextoWifi.completarEspaciosIzq(caja, CAJA)
								+ ManejoTextoWifi.completarEspaciosIzq(botella, BOT) + "\n"
								+ tituloDanio + "\n"
							);
					}
				} else if(hayDatosTitulo) {
					nombreProducto = jsonObj.optString("nombreProducto");
					
					temp = codigoProducto + " " + nombreProducto;
					
					if (temp.length() > SKU) {
						producto = temp.substring(0, SKU - 1);
					} else {
						producto = temp;
					}
					
					//Aqui es donde Imprime la Linea del Titulo de Los Envases
					if (codigoProducto != "null" && nombreProducto != "null" && caja != "null" && botella != "null") {
						strBdetalleInventario.append(
								"\n"+tituloLinea + "\n"
								+ ManejoTextoWifi.completarEspaciosDer(producto, SKU )
								//+ ManejoTextoWifi.completarEspaciosIzq(caja, CAJA)
								+ ManejoTextoWifi.completarEspaciosIzq(botella, BOT ) + "\n"
							);
					}
				} else if (hayDatosDanios) {
					codigoProducto = jsonObj.optString("codigoProducto");
					
					temp = codigoProducto + " " + nombreProducto;
					
					if (temp.length() > SKU) {
						producto = temp.substring(0, SKU-1);
					} else {
						producto = temp;
					}
					
					if (codigoProducto != "null" && nombreProducto != "null" && caja != "null" && botella != "null") {
						strBdetalleInventario.append(
								ManejoTextoWifi.completarEspaciosDer(producto, SKU)
								+ ManejoTextoWifi.completarEspaciosIzq(caja, CAJA)
								+ ManejoTextoWifi.completarEspaciosIzq(botella, BOT) + "\n"
								+ tituloDanio + "\n"
							);
					}
				}
			}
			return strBdetalleInventario.toString();
		} else {
			return "             DETALLE DE PRODUCTOS N/D\n";
		}
	}

	
}