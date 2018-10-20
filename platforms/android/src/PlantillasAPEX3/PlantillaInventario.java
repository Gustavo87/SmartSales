package PlantillasAPEX3;

import org.json.JSONArray;
import org.json.JSONObject;

import android.util.Log;

public class PlantillaInventario {

	private String tituloInventario = "N/D", fecha = "N/D", ruta = "N/D", hora = "N/D";
	private int totalCAJ = 0, totalBOT = 0;
	
	private JSONArray detalleInventario = null;
	
	private StringBuilder inventarioAbordo;

	public PlantillaInventario() {
	}
	
	public String getInventarioABordo() {
		inventarioAbordo = new StringBuilder();

		inventarioAbordo.append("J4");
		inventarioAbordo.append("                U1" + tituloInventario + "U0                   ");
		inventarioAbordo.append("J8");
		inventarioAbordo.append("U1FechaU0: " + fecha + "                   U1HoraU0: "+ hora + "\n");
		inventarioAbordo.append("U1RutaU0 : " + ruta);
		inventarioAbordo.append("J8");
		inventarioAbordo.append("U1PRDOUCTO                                         CJ   BOTU0");
		inventarioAbordo.append("J4");
		inventarioAbordo.append(this.generarDetalleInventario());
		inventarioAbordo.append("J4");
		inventarioAbordo.append("U1" + completarEspaciosIzq("Total", 44) + "U0:" + completarEspaciosIzq(String.valueOf(totalCAJ), 5) + completarEspaciosIzq(String.valueOf(totalBOT), 6));
		inventarioAbordo.append("J4");
		inventarioAbordo.append("-----------------------ULTIMA LINEA----------------------");
		inventarioAbordo.append("J8 J8 J8 J2");

		Log.i("RECIBOS", inventarioAbordo.toString());
		
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
					
					temp = codigoProducto + " " + nombreProducto;
					
					if (temp.length() > 44) {
						producto = temp.substring(0, 43);
					} else {
						producto = temp;
					}
					
					
					if (codigoProducto != "null" && nombreProducto != "null" && caja != "null" && botella != "null") {
						strBdetalleInventario.append(
								completarEspaciosDer(producto, 46)
								+ completarEspaciosIzq(caja, 5)
								+ completarEspaciosIzq(botella, 6) + "\n"
							);
					}
				}
				
				if (hayDatosTitulo == true && hayDatosDanios == true) {
					temp = codigoProducto + " " + nombreProducto;
					
					if (temp.length() > 44) {
						producto = temp.substring(0, 43);
					} else {
						producto = temp;
					}
					
					if (codigoProducto != "null" && nombreProducto != "null" && caja != "null" && botella != "null") {
						strBdetalleInventario.append(
								tituloLinea + "\n"
								+ completarEspaciosDer(producto, 46)
								+ completarEspaciosIzq(caja, 5)
								+ completarEspaciosIzq(botella, 6) + "\n"
								+ tituloDanio + "\n"
							);
					}
				} else if(hayDatosTitulo) {
					nombreProducto = jsonObj.optString("nombreProducto");
					
					temp = codigoProducto + " " + nombreProducto;
					
					if (temp.length() > 44) {
						producto = temp.substring(0, 43);
					} else {
						producto = temp;
					}
					
					if (codigoProducto != "null" && nombreProducto != "null" && caja != "null" && botella != "null") {
						strBdetalleInventario.append(
								tituloLinea + "\n"
								+ completarEspaciosDer(producto, 46)
								+ completarEspaciosIzq(caja, 5)
								+ completarEspaciosIzq(botella, 6) + "\n"
							);
					}
				} else if (hayDatosDanios) {
					codigoProducto = jsonObj.optString("codigoProducto");
					
					temp = codigoProducto + " " + nombreProducto;
					
					if (temp.length() > 44) {
						producto = temp.substring(0, 43);
					} else {
						producto = temp;
					}
					
					if (codigoProducto != "null" && nombreProducto != "null" && caja != "null" && botella != "null") {
						strBdetalleInventario.append(
								completarEspaciosDer(producto, 46)
								+ completarEspaciosIzq(caja, 5)
								+ completarEspaciosIzq(botella, 6) + "\n"
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
}